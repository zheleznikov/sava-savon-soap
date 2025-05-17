import {TAcid} from "./acids.types";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";

export const acids: TAcid[] = [
    {
        id: 1,
        name_rus: "Лимонная кислота",
        name_eng: "Citric Acid",
        neutralization: {
            naoh: 0.624,
            koh: 0.876
        },
        percent: 0,
        mass: 0,
        inputType: InputType.Mass
    },
    {
        id: 2,
        name_rus: "Молочная кислота 80%",
        name_eng: "Lactic Acid",
        neutralization: {
            naoh: 0.355, //  naoh: 0.444 для 100% ?
            koh: .498  //  koh: 0.623 для 100% ?
        },
        percent: 0,
        mass: 0,
        inputType: InputType.Mass
    },
    {
        id: 3,
        name_rus: "Яблочная кислота",
        name_eng: "Malic Acid",
        neutralization: {
            naoh: 0.597,
            koh: 0.837
        },
        percent: 0,
        mass: 0,
        inputType: InputType.Mass

    },
    {
        id: 4,
        name_rus: "Винная кислота",
        name_eng: "Tartaric Acid",
        neutralization: {
            naoh: 0.533,
            koh: 0.748
        },
        percent: 0,
        mass: 0,
        inputType: InputType.Mass

    },
    {
        id: 5,
        name_rus: "Янтарная кислота",
        name_eng: "Succinic Acid",
        neutralization: {
            naoh: 0.678,
            koh: 0.951
        },
        percent: 0,
        mass: 0,
        inputType: InputType.Mass
    }


];
