import {oils} from "../../../entities/oil/model/oils";
import {RecipeState} from "../types/recipeScile.interface";
import {
    InputType,
    LyeType,
    MeasureInputType,
    WaterInputType
} from "../../../app/providers/SoapRecipeContext.types";

const defaultSelectedOils = oils.filter(oil => [2, 1, 29].includes(oil.id));

export const recipeSliceinitialState: RecipeState = {
    input: {
        ingredients: {
            selectedOils: [...defaultSelectedOils],
            selectedAcids: [],
            selectedCustoms: []
        },
        params: {
            lyeTypeInput: {
                lyeType: LyeType.NaOH,
                NaOHPurity: 100,
                KOHPurity: 100,
                NaOHPercentageInMixed: 50,
                KOHPercentageInMixed: 50
            },
            measureInput: MeasureInputType.Gram,
            oilInputType: InputType.Mass,
            waterInput: {
                waterInputType: WaterInputType.WaterAsPercent,
                waterPercent: 33,
                lyeConcentration: 33,
                waterLyeRatio: 2.0
            },
            superfatPercent: 5,
            userDefinedTotalWeight: 0
        },
        description: {
            recipeName: "",
            description: undefined,
            link: undefined
        }
    },
    output: {
        total: {
            totalOilAmount: 0,
            totalAcidAmount: 0,
            totalLyeAmount: 0,
            totalNaOHAmount: 0,
            totalKOHAmount: 0,
            totalWaterAmount: 0,
            totalResultAmount: 0
        },
        soapProperties: {
            hardness: 0,
            cleansing: 0,
            soften: 0,
            bubbling: 0,
            creaminess: 0,
            iodine: 0,
            ins: 0
        }
    },
    status: {
        status: "idle",
        hasEverCalculated: false
    }
};
