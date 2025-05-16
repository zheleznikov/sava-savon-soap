export enum InputType {
    Mass = "mass",
    Percent = "percent",
}

export enum MeasureInputType {
    Gram = "gram",
    Ounces = "ounces",
}

export const measureInputTypeMeta = {
    [MeasureInputType.Gram]: {
        ru: { short: "гр.", full: "Граммы" },
        en: { short: "g", full: "Grams" },
    },
    [MeasureInputType.Ounces]: {
        ru: { short: "унц.", full: "Унции" },
        en: { short: "oz", full: "ounces" },
    },
} as const;
export enum LyeType {
    NaOH = "NaOH",
    KOH = "KOH",
    Mixed = "NaOH + KOH"
}

export enum WaterInputType {
    WaterAsPercent = "От процента масел",
    LyeConcentration = "Относительно щелочи",
    WaterLyeRatio = "концентрация щелочи",
}

