// hooks/useSoapCalculations.ts
import { useSoapRecipe } from "../context/useSoapRecipe";
import { useState, useEffect } from "react";

export const useSoapCalculations = () => {
    const { selectedOils } = useSoapRecipe();

    const [totalOilWeight, setTotalOilWeight] = useState(0);

    useEffect(() => {
        const sum = selectedOils.reduce((acc, oil) => acc + (oil.gram || 0), 0);
        setTotalOilWeight(sum);
    }, [selectedOils]);

    return {
        totalOilWeight, setTotalOilWeight
    };
};