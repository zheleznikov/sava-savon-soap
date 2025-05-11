import {TAcid} from "./acids.types";

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
        gram: 0
    },
    {
        id: 2,
        name_rus: "Молочная кислота",
        name_eng: "Lactic Acid",
        neutralization: {
            naoh: 0.444,
            koh: 0.623
        },
        percent: 0,
        gram: 0
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
        gram: 0
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
        gram: 0
    },
    {
        id: 5,
        name_rus: "Аскорбиновая кислота",
        name_eng: "Ascorbic Acid (Vitamin C)",
        neutralization: {
            naoh: 0.227,
            koh: 0.319
        },
        percent: 0,
        gram: 0
    }
];
