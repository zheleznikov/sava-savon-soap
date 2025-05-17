import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {RecipeLyeTypeInput, WaterInput} from "../types/recipeScile.interface";
import {calculateLyeSum} from "./lyeCalculation";
import {calculateWaterSum} from "./waterCalculation";


export type TScaleRecipe = {
    selectedOils: TOil[];
    selectedAcids: TAcid[];
    selectedCustoms: TCustom [];
    userDefinedTotalWeight: number;
    waterInput: WaterInput;
    superfatPercent: number;
    lyeTypeInput: RecipeLyeTypeInput;
};


/**
 * Подбирает массу масел (oilMass) для рецепта так, чтобы итоговый вес готового продукта
 * максимально приблизился к заданному пользователем userDefinedTotalWeight.
 *
 * Использует бинарный поиск (итерационный метод), чтобы учесть не только масла,
 * но и все добавки: кислоты, пользовательские компоненты, воду и щёлочь,
 * которые зависят от массы масел, их процентного состава и типа ввода (масса/проценты).
 *
 * Применяется при расчёте рецепта в режиме ввода масел в процентах:
 * функция помогает определить, сколько именно грамм масел должно быть,
 * чтобы после добавления всех ингредиентов и воды вес был ровно тем, что запросил пользователь.
 *
 * Внутри на каждом шаге:
 *  - перерасчитывает массу всех ингредиентов (масел, кислот, кастомов) на основе "гипотетической" массы масел
 *  - вычисляет массу щёлочи (с учётом кислот и кастомов), и воды (через пользовательские настройки)
 *  - считает общий итоговый вес
 *  - если итог совпадает с желаемым — возвращает найденную массу масел, иначе ищет дальше (до MAX_ITER раз)
 *
 * @param selectedOils           - массив масел с процентами
 * @param selectedAcids          - массив кислот (с индивидуальными типами ввода)
 * @param selectedCustoms        - массив пользовательских ингредиентов (индивидуально)
 * @param userDefinedTotalWeight - целевой вес готового продукта (в граммах)
 * @param waterInput             - параметры воды (тип, проценты/концентрация/соотношение)
 * @param superfatPercent        - процент пережира (недостатка щёлочи)
 * @param lyeTypeInput           - параметры щёлочи (тип, чистота, соотношение)
 *
 * @returns {number} oilMass     - рассчитанная масса масел (граммы), которую нужно взять для достижения нужного веса рецепта
 */
const findOilMassForTotalWeight = ({
    selectedOils,
    selectedCustoms,
    selectedAcids,
    userDefinedTotalWeight,
    waterInput,
    superfatPercent,
    lyeTypeInput,
}: TScaleRecipe): number => {
    const MAX_ITER = 30;
    const EPSILON = 0.01;
    let low = 0;
    let high = userDefinedTotalWeight;

    for (let i = 0; i < MAX_ITER; i++) {
        const mid = (low + high) / 2;

        // Масла c массами от mid
        const oilsWithMass = selectedOils.map(o => ({
            ...o,
            mass: ((o.percent ?? 0) / 100) * mid
        }));

        const oilMass = oilsWithMass.reduce((sum, o) => sum + (o.mass ?? 0), 0);

        // Кислоты c актуальными массами
        const acidsWithMass = selectedAcids.map(acid => {
            if (acid.inputType === InputType.Mass) return acid;
            return {
                ...acid,
                mass: ((acid.percent ?? 0) / 100) * oilMass
            };
        });

        // Доп ингредиенты c актуальными массами
        const totalCustom = selectedCustoms.map(custom => {
            if (custom.inputType === InputType.Mass) return custom;
            return {
                ...custom,
                mass: ((custom.percent ?? 0) / 100) * oilMass
            };
        }).reduce((sum, custom) => sum + (custom.mass ?? 0), 0);

        const lyeSum = calculateLyeSum({
            selectedOils: oilsWithMass,
            lyeType: lyeTypeInput.lyeType,
            superfatPercent,
            selectedAcids: acidsWithMass,
            NaOHPurity: lyeTypeInput.NaOHPurity,
            KOHPurity: lyeTypeInput.KOHPurity,
            NaOHPercentageInMixed: lyeTypeInput.NaOHPercentageInMixed,
            KOHPercentageInMixed: lyeTypeInput.KOHPercentageInMixed,
        });
        const totalLye = lyeSum.total;

        const totalWater = calculateWaterSum(
            oilMass,
            totalLye,
            waterInput.waterInputType,
            waterInput.waterPercent,
            waterInput.lyeConcentration,
            waterInput.waterLyeRatio
        );

        // Кислоты — их суммарная масса
        const totalAcids = acidsWithMass.reduce((sum, acid) => sum + (acid.mass ?? 0), 0);

        // Итого
        const total = oilMass + totalLye + totalWater + totalAcids + totalCustom;

        if (Math.abs(total - userDefinedTotalWeight) < EPSILON) {
            return oilMass;
        }

        if (total > userDefinedTotalWeight) {
            high = mid;
        } else {
            low = mid;
        }
    }

    return (low + high) / 2;
};


/**
 * Масштабирует (пересчитывает) массы всех ингредиентов рецепта (масел, кислот и кастомных добавок)
 * так, чтобы итоговый вес готового продукта точно соответствовал userDefinedTotalWeight,
 * с учётом воды, щёлочи, кислот, кастомов и текущих процентов каждого масла.
 *
 * Для этого функция:
 *  1. Проверяет, что сумма процентов масел ровно 100 (иначе возвращает ингредиенты без изменений).
 *  2. Вычисляет такую массу масел (oilMass), при которой вся сумма (масла + вода + щёлочь + кислоты + кастомы)
 *     будет равна userDefinedTotalWeight (через бинарный поиск).
 *  3. Перераспределяет массы масел, кислот (и кастомов, если они в процентах) согласно их процентам и найденной oilMass.
 *  4. Возвращает новые массивы ингредиентов с актуальными массами (и прежними процентами).
 *
 * Используется для режима ввода масел в процентах,
 * когда нужно “подогнать” рецепт под нужный итоговый вес (например, 1000 г готового мыла).
 *
 * @param selectedOils      - Массив масел, для которых заданы проценты
 * @param selectedAcids     - Массив кислот, для которых заданы граммы или проценты (individually)
 * @param selectedCustoms   - Массив пользовательских компонентов, для которых заданы граммы или проценты (individually)
 * @param userDefinedTotalWeight - Желаемый итоговый вес готового продукта (в граммах)
 * @param waterInput        - Параметры воды (тип ввода, проценты/соотношение/концентрация)
 * @param superfatPercent   - Процент пережира (недостатка щёлочи)
 * @param lyeTypeInput      - Параметры щёлочи (тип, чистота, соотношение)
 *
 * @returns { updatedOils, updatedAcids, updatedCustoms }
 *          - Массивы с обновлёнными массами для каждого ингредиента (проценты у масел не меняются).
 */
export const scaleRecipeToTotalWeight = ({
    selectedOils,
    selectedAcids,
    selectedCustoms,
    userDefinedTotalWeight,
    waterInput,
    superfatPercent,
    lyeTypeInput
}: TScaleRecipe) => {

    const totalPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

    if (totalPercent !== 100) {
        return {
            updatedOils: selectedOils,
            updatedAcids: selectedAcids,
            updatedCustoms: selectedCustoms
        };
    }

    const oilMass = findOilMassForTotalWeight({
        selectedCustoms,
        selectedOils,
        selectedAcids,
        userDefinedTotalWeight,
        waterInput,
        superfatPercent,
        lyeTypeInput
    });

    const updatedOils = selectedOils.map((oil) => ({
        ...oil,
        mass: (oil.percent ?? 0) / 100 * oilMass,
    }));

    const updatedAcids = selectedAcids.map(acid => {
        switch (acid.inputType) {
            case InputType.Mass:
                return {
                    ...acid,
                    percent: oilMass > 0 ? (acid.mass ?? 0) / oilMass * 100 : 0,
                };
            case InputType.Percent:
                return {
                    ...acid,
                    mass: oilMass > 0 ? (acid.percent ?? 0) / 100 * oilMass : 0,
                };
            default:
                return acid;
        }
    });

    const updatedCustoms = selectedCustoms.map(custom => {
        switch (custom.inputType) {
            case InputType.Mass:
                return {
                    ...custom,
                    percent: oilMass > 0 ? (custom.mass ?? 0) / oilMass * 100 : 0,
                };
            case InputType.Percent:
                return {
                    ...custom,
                    mass: oilMass > 0 ? (custom.percent ?? 0) / 100 * oilMass : 0,
                };
            default:
                return custom;
        }
    });

    return {updatedOils, updatedAcids, updatedCustoms};
};


/**
 * Синхронизирует проценты и массы для масел, кислот и кастомов
 * @param oils - массив масел
 * @param acids - массив кислот
 * @param customs - массив кастомных ингредиентов
 * @param oilSum - сумма масс масел (граммы)
 * @returns { oils, acids, customs } - новые массивы с актуальными mass и percent
 */
export const syncIngredientsMassAndPercent = (
    oils: TOil[],
    acids: TAcid[],
    customs: TCustom[],
    oilSum: number
) => {

    const syncedOils = oils.map(oil => ({
        ...oil,
        percent: oilSum > 0 ? (oil.mass ?? 0) / oilSum * 100 : 0,
    }));

    const syncedAcids = acids.map(acid => {
        switch (acid.inputType) {
            case InputType.Mass:
                return {
                    ...acid,
                    percent: oilSum > 0 ? (acid.mass ?? 0) / oilSum * 100 : 0,
                };
            case InputType.Percent:
                return {
                    ...acid,
                    mass: oilSum > 0 ? (acid.percent ?? 0) / 100 * oilSum : 0,
                };
            default:
                return acid;
        }
    });

    const syncedCustoms = customs.map(custom => {
        switch (custom.inputType) {
            case InputType.Mass:
                return {
                    ...custom,
                    percent: oilSum > 0 ? (custom.mass ?? 0) / oilSum * 100 : 0,
                };
            case InputType.Percent:
                return {
                    ...custom,
                    mass: oilSum > 0 ? (custom.percent ?? 0) / 100 * oilSum : 0,
                };
            default:
                return custom;
        }
    });

    return {
        oils: syncedOils,
        acids: syncedAcids,
        customs: syncedCustoms,
    };
}





