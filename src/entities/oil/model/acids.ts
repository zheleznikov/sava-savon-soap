import {TAcid} from "./acids.types";

export const acids: TAcid[] = [
    {
        id: 1,
        name_rus: "Лимонная кислота",
        name_eng: "Citric Acid",
        neutralization: {
            naoh: 0.624,
            koh: 0.875
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
            naoh: 0.571,
            koh: 0.812
        },
        percent: 0,
        gram: 0
    },
    {
        id: 4,
        name_rus: "Винная кислота",
        name_eng: "Tartaric Acid",
        neutralization: {
            naoh: 0.7,
            koh: 0.98
        },
        percent: 0,
        gram: 0
    },
    {
        id: 5,
        name_rus: "Аскорбиновая кислота",
        name_eng: "Ascorbic Acid (Vitamin C)",
        neutralization: {
            naoh: 0.56,
            koh: 0.79
        },
        percent: 0,
        gram: 0
    }
];
