import {TOil} from "../../../entities/oil/model/oil.types";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";

export const calculateSoapProperties = (selectedOils: TOil[], oilInputType: InputType) => {
    if (!selectedOils.length) {
        return {
            hardness: 0,
            cleansing: 0,
            soften: 0,
            bubbling: 0,
            creaminess: 0,
            iodine: 0,
            ins: 0
        };
    }

    let totalWeight = 0;
    const totals = {
        hardness: 0,
        cleansing: 0,
        soften: 0,
        bubbling: 0,
        creaminess: 0,
        iodine: 0,
        sap: 0
    };

    selectedOils.forEach(oil => {
        const amount = oilInputType === InputType.Percent ? oil.percent : oil.mass;
        if (!amount) return;

        totalWeight += amount;
        totals.hardness += oil.properties.hardness * amount;
        totals.cleansing += oil.properties.cleansing * amount;
        totals.soften += oil.properties.soften * amount;
        totals.bubbling += oil.properties.bubbling * amount;
        totals.creaminess += oil.properties.creaminess * amount;
        totals.iodine += oil.iodine * amount;
        totals.sap += oil.sap.naoh * amount;
    });

    const round = (v: number) => Math.round(v * 10) / 10;

    const iodineAvg = totals.iodine / totalWeight;
    const sapAvg = totals.sap / totalWeight;
    const ins = sapAvg * 1000 - iodineAvg;

    return {
        hardness: round(totals.hardness / totalWeight),
        cleansing: round(totals.cleansing / totalWeight),
        soften: round(totals.soften / totalWeight),
        bubbling: round(totals.bubbling / totalWeight),
        creaminess: round(totals.creaminess / totalWeight),
        iodine: round(iodineAvg),
        ins: round(ins)
    };
};
