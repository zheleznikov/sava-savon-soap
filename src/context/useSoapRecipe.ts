import { useContext } from "react";
import { SoapRecipeContext } from "./SoapRecipeContext";

export const useSoapRecipe = () => {
    const context = useContext(SoapRecipeContext);
    if (!context) {
        throw new Error("useSoapRecipe must be used within a SoapRecipeProvider");
    }
    return context;
};
