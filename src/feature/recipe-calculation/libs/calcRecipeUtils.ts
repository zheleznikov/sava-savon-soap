import {InputType, LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../../entities/oil/model/oil.types";

type CalculateOilSumParams = {
    selectedOils: TOil[];
    inputType: InputType;
    userDefinedTotalWeight: number;
    waterPercent: number;
    superfatPercent: number;
};

export const calculateOilSum = (
    {
        selectedOils,
        inputType,
        userDefinedTotalWeight,
        waterPercent,
        superfatPercent,
    }: CalculateOilSumParams): number => {

    switch (inputType) {
        case InputType.Gram: {  // Суммируем вес всех масел
            return selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0);
        }

        case InputType.Percent: { // Рассчитываем массу масел из общей массы мыла

            const hasGrams = selectedOils.every(oil => oil.gram && oil.gram > 0);

            if (hasGrams) {
                return selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0);
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

type CalculateLyeSumParams = {
    selectedOils: TOil[];
    lyeType: LyeType;
    superfatPercent: number;
};
export const calculateLyeSum = (
    {
        selectedOils,
        lyeType,
        superfatPercent
    }: CalculateLyeSumParams
): number => {

    return selectedOils.reduce((acc, oil) => {
        const sap = getOilSAP(oil, lyeType);
        return acc + (oil.gram || 0) * sap * (1 - superfatPercent / 100);
    }, 0);
}


export const calculateWaterSum = (
    oilSum: number,
    waterPercent: number
): number => {
    return oilSum * (waterPercent / 100);
}


type TScaleReipe = {
    selectedOils: TOil[],
    userDefinedTotalWeight: number,
    waterPercent: number,
    superfatPercent: number,
    lyeType: LyeType
};

export const scaleRecipeToTotalWeight = ({
                                             selectedOils,
                                             userDefinedTotalWeight,
                                             waterPercent,
                                             superfatPercent,
                                             lyeType,
                                         }: TScaleReipe): TOil[] => {
    let oils = [...selectedOils];

    const totalOil = oils.reduce((sum, oil) => sum + (oil.gram || 0), 0);

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
                gram: (oil.percent / 100) * oilMassEstimate,
            }));

        } else {
            // Если проценты невалидны — ничего не делаем
            return selectedOils;
        }
    }

    // Теперь масштабируем как обычно
    const oilMass = oils.reduce((sum, oil) => sum + (oil.gram || 0), 0);

    const totalLye = oils.reduce((sum, oil) => {
        const sap = getOilSAP(oil, lyeType);
        return sum + (oil.gram || 0) * sap * (1 - superfatPercent / 100);
    }, 0);

    const totalWater = oilMass * (waterPercent / 100);
    const totalCurrent = oilMass + totalLye + totalWater;

    if (totalCurrent === 0) return selectedOils;

    const scale = userDefinedTotalWeight / totalCurrent;

    return oils.map((oil) => ({
        ...oil,
        gram: (oil.gram || 0) * scale,
    }));
};



export const isValidPercentRange = (totalEnteredPercent: number) : boolean => {
    return  totalEnteredPercent >= 99 && totalEnteredPercent <= 101;
}


export const recalculatePercents = (oils: TOil[]): TOil[] => {
    const totalGram = oils.reduce((sum, o) => sum + (o.gram || 0), 0);
    return oils.map(o => ({
        ...o,
        percent: totalGram > 0 ? (o.gram / totalGram) * 100 : 0,
    }));
};

const getOilSAP = (oil: TOil, lyeType: LyeType) => {
    return lyeType === LyeType.NaOH ? oil.sap.naoh : oil.sap.koh;
};
