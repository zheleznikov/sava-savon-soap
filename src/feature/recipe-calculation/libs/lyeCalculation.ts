import {TOil} from "../../../entities/oil/model/oil.types";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {getAcidNeutralization, getOilSAP} from "./utils";


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

        return {naoh, koh};
    }

    const sap = getOilSAP(oil, lyeType);
    const purity = lyeType === LyeType.NaOH ? NaOHPurity : KOHPurity;
    const base = weight * sap * (1 - superfatPercent / 100) / (purity / 100);

    return lyeType === LyeType.NaOH
        ? {naoh: base, koh: 0}
        : {naoh: 0, koh: base};
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
        return {naoh, koh};
    }

    const neutral = getAcidNeutralization(acid, lyeType);
    const base = weight * neutral / ((lyeType === LyeType.NaOH ? NaOHPurity : KOHPurity) / 100);

    return lyeType === LyeType.NaOH
        ? {naoh: base, koh: 0}
        : {naoh: 0, koh: base};
};
