import {WaterInputType} from "../../../app/providers/SoapRecipeContext.types";

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
