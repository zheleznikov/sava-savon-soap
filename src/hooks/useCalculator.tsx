import {useState} from "react";
import {selectedOil} from "../types/selectedOil";


const defaultOil: selectedOil = {
    percent: 0, weight: 0, oil: null, id: -1
};
export const useCalculator = () => {

    const [selectedOils, setSelectedOils] = useState<selectedOil []>([defaultOil]);


    return {
        selectedOils, setSelectedOils
    };
};