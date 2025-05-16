import {InputType, LyeType, WaterInputType} from "../../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {TCustom} from "../../../entities/oil/model/custom.types";

type CalculateOilSumParams = {
    selectedOils: TOil[];
    oilInputType: InputType;
    userDefinedTotalWeight: number;
    waterPercent: number;
    superfatPercent: number;
};

export const calculateOilSum = (
    {
        selectedOils,
        oilInputType,
        userDefinedTotalWeight,
        waterPercent,
        superfatPercent,
    }: CalculateOilSumParams): number => {

    switch (oilInputType) {
        case InputType.Mass: {  // Суммируем вес всех масел
            return selectedOils.reduce((acc, oil) => acc + (oil.mass || 0), 0);
        }

        case InputType.Percent: { // Рассчитываем массу масел из общей массы мыла

            const hasGrams = selectedOils.every(oil => oil.mass && oil.mass > 0);

            if (hasGrams) {
                return selectedOils.reduce((acc, oil) => acc + (oil.mass || 0), 0);
            }

            const totalEnteredPercent = selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

            if (isValidPercentRange(totalEnteredPercent)) {
                // Предварительный подсчёт lyeSum и waterSum по массе масел — потребуется для расчёта oilSum
                const tempLyeFraction = 0.14 * (1 - superfatPercent / 100);
                const waterFraction = waterPercent / 100;
                const totalNonOilFraction = tempLyeFraction + waterFraction;

                const estimatedOilSum = userDefinedTotalWeight / (1 + totalNonOilFraction);
                return estimatedOilSum;
            }

        }
    }
    return 0;
}



export const calculateAcidSum = ( selectedAcids: TAcid[]): number => {
    return selectedAcids.reduce((acc, acid) => acc + (acid.mass || 0), 0);
};

export const calculateCustomSum = ( selectedCustoms: TCustom[]): number => {
    return selectedCustoms.reduce((acc, custom) => acc + (custom.mass || 0), 0);
};


type CalculateLyeSumParams = {
    selectedOils: TOil[];
    lyeType: LyeType;
    superfatPercent: number;
    selectedAcids?: TAcid []
    NaOHPurity?: number;
    KOHPurity?: number;
    NaOHPercentageInMixed?: number;
    KOHPercentageInMixed?: number;
};
export const calculateLyeSum = ({
    selectedOils,
    lyeType,
    superfatPercent,
    selectedAcids,
    NaOHPurity = 99,
    KOHPurity = 90,
    NaOHPercentageInMixed = 50,
    KOHPercentageInMixed = 50,
}: CalculateLyeSumParams): { total: number, naoh: number, koh: number } => {

    let naoh = 0;
    let koh = 0;

    for (const oil of selectedOils) {
        const lye = calculateLyeForOil(oil, lyeType, superfatPercent, NaOHPurity, KOHPurity, NaOHPercentageInMixed, KOHPercentageInMixed);
        naoh += lye.naoh;
        koh += lye.koh;
    }

    for (const acid of selectedAcids ?? []) {
        const lye = calculateLyeForAcid(acid, lyeType, NaOHPurity, KOHPurity, NaOHPercentageInMixed, KOHPercentageInMixed);
        naoh += lye.naoh;
        koh += lye.koh;
    }

    return {
        total: naoh + koh,
        naoh,
        koh
    };
};


export const calculateLyeForOil = (
    oil: TOil,
    lyeType: LyeType,
    superfatPercent: number,
    NaOHPurity: number,
    KOHPurity: number,
    NaOHPercentageInMixed: number,
    KOHPercentageInMixed: number
): { naoh: number, koh: number } => {
    const weight = oil.mass || 0;

    if (lyeType === LyeType.Mixed) {
        const sapNaOH = oil.sap.naoh;
        const sapKOH = oil.sap.koh;

        const naoh = weight * sapNaOH * (1 - superfatPercent / 100) * (NaOHPercentageInMixed / 100) / (NaOHPurity / 100);
        const koh = weight * sapKOH * (1 - superfatPercent / 100) * (KOHPercentageInMixed / 100) / (KOHPurity / 100);

        return { naoh, koh };
    }

    const sap = getOilSAP(oil, lyeType);
    const purity = lyeType === LyeType.NaOH ? NaOHPurity : KOHPurity;
    const base = weight * sap * (1 - superfatPercent / 100) / (purity / 100);

    return lyeType === LyeType.NaOH
        ? { naoh: base, koh: 0 }
        : { naoh: 0, koh: base };
};


export const calculateLyeForAcid = (
    acid: TAcid,
    lyeType: LyeType,
    NaOHPurity: number,
    KOHPurity: number,
    NaOHPercentageInMixed: number,
    KOHPercentageInMixed: number
): { naoh: number, koh: number } => {
    const weight = acid.mass || 0;

    if (lyeType === LyeType.Mixed) {
        const naoh = weight * acid.neutralization.naoh * (NaOHPercentageInMixed / 100) / (NaOHPurity / 100);
        const koh = weight * acid.neutralization.koh * (KOHPercentageInMixed / 100) / (KOHPurity / 100);
        return { naoh, koh };
    }

    const neutral = getAcidNeutralization(acid, lyeType);
    const base = weight * neutral / ((lyeType === LyeType.NaOH ? NaOHPurity : KOHPurity) / 100);

    return lyeType === LyeType.NaOH
        ? { naoh: base, koh: 0 }
        : { naoh: 0, koh: base };
};



export const calculateWaterSum2 = (
    oilSum: number,
    waterPercent: number
): number => {
    return oilSum * (waterPercent / 100);
}


export const calculateWaterSum = (
    oilSum: number,
    lyeSum: number,
    waterInputType: WaterInputType,
    waterPercent: number,
    lyeConcentration: number,
    waterLyeRatio: number
): number => {
    switch (waterInputType) {
        case WaterInputType.WaterAsPercent:
            return oilSum * (waterPercent / 100);

        case WaterInputType.LyeConcentration:
            if (lyeConcentration <= 0 || lyeConcentration >= 100) return 0;
            return lyeSum * (100 - lyeConcentration) / lyeConcentration;

        case WaterInputType.WaterLyeRatio:
            return lyeSum * waterLyeRatio;

        default:
            return 0;
    }
};



type TScaleReipe = {
    selectedOils: TOil[],
    userDefinedTotalWeight: number,
    waterPercent: number,
    superfatPercent: number,
    lyeType: LyeType
};

// TODO обновить с учетом кислот
export const scaleRecipeToTotalWeight = ({
    selectedOils,
    userDefinedTotalWeight,
    waterPercent,
    superfatPercent,
    lyeType,
}: TScaleReipe): TOil[] => {
    let oils = [...selectedOils];

    const totalOil = oils.reduce((sum, oil) => sum + (oil.mass || 0), 0);

    // Если у масел нет грамм, но есть проценты — рассчитываем граммы предварительно
    if (totalOil === 0) {
        const totalPercent = oils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

        if (isValidPercentRange(totalPercent)) {
            // Определим массу масел из общей массы с учётом доли воды и щелочи
            const lyeFraction = 0.14 * (1 - superfatPercent / 100); // приближённо
            const waterFraction = waterPercent / 100;
            const oilMassEstimate = userDefinedTotalWeight / (1 + lyeFraction + waterFraction);

            // Назначим граммы по долям
            oils = oils.map((oil) => ({
                ...oil,
                mass: (oil.percent / 100) * oilMassEstimate,
            }));

        } else {
            // Если проценты невалидны — ничего не делаем
            return selectedOils;
        }
    }

    // Теперь масштабируем как обычно
    const oilMass = oils.reduce((sum, oil) => sum + (oil.mass || 0), 0);

    const totalLye = oils.reduce((sum, oil) => {
        const sap = getOilSAP(oil, lyeType);
        return sum + (oil.mass || 0) * sap * (1 - superfatPercent / 100);
    }, 0);

    const totalWater = oilMass * (waterPercent / 100);
    const totalCurrent = oilMass + totalLye + totalWater;

    if (totalCurrent === 0) return selectedOils;

    const scale = userDefinedTotalWeight / totalCurrent;

    return oils.map((oil) => ({
        ...oil,
        mass: (oil.mass || 0) * scale,
    }));
};


export const isValidPercentRange = (totalEnteredPercent: number): boolean => {
    return totalEnteredPercent >= 99 && totalEnteredPercent <= 101;
}


export const recalculatePercents = (oils: TOil[]): TOil[] => {
    const totalGram = oils.reduce((sum, o) => sum + (o.mass || 0), 0);
    return oils.map(o => ({
        ...o,
        percent: totalGram > 0 ? (o.mass / totalGram) * 100 : 0,
    }));
};

export const getOilSAP = (oil: TOil, lyeType: LyeType) => {
    return lyeType === LyeType.NaOH ? oil.sap.naoh : oil.sap.koh;
};

export const getAcidNeutralization = (acid: TAcid, lyeType: LyeType) => {
    return lyeType === LyeType.NaOH ? acid.neutralization.naoh : acid.neutralization.koh;
};


type TScaleRecipeWithAcids = {
    selectedOils: TOil[];
    selectedAcids: TAcid[];
    userDefinedTotalWeight: number;
    waterPercent: number;
    superfatPercent: number;
    lyeType: LyeType;
    acidInputType: InputType;
};

type TScaledRecipe = {
    oils: TOil[];
    acids: TAcid[];
};

export const scaleRecipeToTotalWeightDevelop = ({
    selectedOils,
    selectedAcids,
    userDefinedTotalWeight,
    waterPercent,
    superfatPercent,
    lyeType,
    acidInputType,
}: TScaleRecipeWithAcids): TScaledRecipe => {
    let oils = [...selectedOils];
    let acids = [...selectedAcids];

    const totalOil = oils.reduce((sum, oil) => sum + (oil.mass || 0), 0);

    // 1. Если граммы масел отсутствуют — рассчитаем их из процентов
    if (totalOil === 0) {
        const totalPercent = oils.reduce((sum, oil) => sum + (oil.percent || 0), 0);

        if (isValidPercentRange(totalPercent)) {
            const lyeFraction = 0.14 * (1 - superfatPercent / 100); // приближённо
            const waterFraction = waterPercent / 100;

            const oilMassEstimate = userDefinedTotalWeight / (1 + lyeFraction + waterFraction);

            oils = oils.map((oil) => ({
                ...oil,
                mass: (oil.percent / 100) * oilMassEstimate,
            }));
        } else {
            return {oils: selectedOils, acids: selectedAcids};
        }
    }

    const oilMass = oils.reduce((sum, oil) => sum + (oil.mass || 0), 0);

    // 2. Кислоты: пересчитываем граммы из процентов, если требуется
    if (acidInputType === InputType.Percent) {
        acids = acids.map((acid) => ({
            ...acid,
            mass: (acid.percent / 100) * oilMass,
        }));
    }

    const totalAcid = acids.reduce((sum, acid) => sum + (acid.mass || 0), 0);

    // 3. Рассчитываем щёлочь и воду
    const totalLyeFromOils = oils.reduce((sum, oil) => {
        const sap = getOilSAP(oil, lyeType);
        return sum + (oil.mass || 0) * sap * (1 - superfatPercent / 100);
    }, 0);

    const totalLyeFromAcids = acids.reduce((sum, acid) => {
        const neutralization = getAcidNeutralization(acid, lyeType);
        return sum + (acid.mass || 0) * neutralization;
    }, 0);

    const totalLye = totalLyeFromOils + totalLyeFromAcids;

    const totalWater = oilMass * (waterPercent / 100);

    const totalCurrent = oilMass + totalLye + totalWater + totalAcid;

    if (totalCurrent === 0) return {oils: selectedOils, acids: selectedAcids};

    const scale = userDefinedTotalWeight / totalCurrent;

    // 4. Масштабируем масла и кислоты
    const scaledOils = oils.map((oil) => ({
        ...oil,
        gram: (oil.mass || 0) * scale,
    }));

    const scaledAcids = acids.map((acid) => ({
        ...acid,
        gram: (acid.mass || 0) * scale,
    }));

    return {oils: scaledOils, acids: scaledAcids};
};

