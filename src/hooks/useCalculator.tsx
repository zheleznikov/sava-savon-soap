import {useState} from "react";
import {TSelectedOil} from "../types/TSelectedOil";


export const useCalculator = () => {

    const [selectedOils, setSelectedOils] = useState<TSelectedOil []>([]);


    return {
        selectedOils, setSelectedOils
    };
};