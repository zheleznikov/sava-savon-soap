export type TIngredientBase = {
    id: number;
    name_rus: string;
    name_eng: string;
    percent: number;
    gram: number;
};


export type CustomIngredient = {
    id: number;
    name: string;
    percent: number;
    gram: number;
};
