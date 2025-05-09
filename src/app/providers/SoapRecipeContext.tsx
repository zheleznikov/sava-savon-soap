import {createContext, ReactNode, useState} from "react";
import {TOil} from "../../entities/oil/model/oil.types";
import {InputType, LyeType, SoapRecipeContextType} from "./SoapRecipeContext.types";
import {recalculatePercents} from "../../feature/recipe-calculation";
import {oils} from "../../entities/oil/model/oils";
import {TAcid} from "../../entities/oil/model/acids.types";

export const SoapRecipeContext = createContext<SoapRecipeContextType | undefined>(undefined);

export const SoapRecipeProvider = ({ children }: { children: ReactNode }) => {

    const defaultSelectedOils = oils.filter(oil => [2, 1, 29].includes(oil.id));
    const [selectedOils, setSelectedOils] = useState<TOil[]>([...defaultSelectedOils]);
    const [selectedAcids, setSelectedAcids] = useState<TAcid []>([]);

    const [recipeName, setRecipeName] = useState("");
    const [oilInputType, setOilInputType] = useState<InputType>(InputType.Gram);
    const [lyeType, setLyeType] = useState<LyeType>(LyeType.NaOH);
    const [waterPercent, setWaterPercent] = useState(33);
    const [superfatPercent, setSuperfatPercent] = useState(5);

    const [userDefinedTotalWeight, setUserDefinedTotalWeight] = useState(0);


    const handleToggleOil = (oil: TOil) => {
        setSelectedOils((prev) => {
            const isSelected = prev.some((o) => o.id === oil.id);
            const updated = isSelected
                ? prev.filter((o) => o.id !== oil.id)
                : [...prev, oil];

            return recalculatePercents(updated);
        });
    };

    const handleToggleAcid = (acid: TAcid) => {
        setSelectedAcids((prev) => {
            const isSelected = prev.some((a) => a.id === acid.id);
            const updated = isSelected
                ? prev.filter((a) => a.id !== acid.id)
                : [...prev, acid];

            return updated;
        });
    };


    const updateOilGramWithRecalculatedPercents = (oil: TOil, newGram: number) => {
        const updatedOilsBase = selectedOils.map((o) =>
            o.id === oil.id ? { ...o, gram: newGram } : o
        );
        const totalGram = updatedOilsBase.reduce((sum, o) => sum + (o.gram || 0), 0);

        const updatedOils = updatedOilsBase.map((o) => ({
            ...o,
            percent: totalGram > 0 ? (o.gram / totalGram) * 100 : 0,
        }));

        setSelectedOils(updatedOils);
    };

    const updateOilPercentWithGramRecalculation = (oil: TOil, newPercent: number, totalOilMass: number) => {
        const updatedOils = selectedOils.map((o) =>
            o.id === oil.id
                ? {
                    ...o,
                    percent: newPercent,
                    gram: totalOilMass > 0 ? (newPercent / 100) * totalOilMass : 0,
                }
                : o
        );
        setSelectedOils(updatedOils);
    };

    return (
        <SoapRecipeContext.Provider
            value={{
                recipeName, setRecipeName,
                oilInputType, setOilInputType,
                lyeType, setLyeType,
                waterPercent, setWaterPercent,
                superfatPercent, setSuperfatPercent,
                selectedOils, setSelectedOils,
                userDefinedTotalWeight, setUserDefinedTotalWeight,
                selectedAcids, setSelectedAcids,
                handleToggleAcid,
                handleToggleOil,
                updateOilGramWithRecalculatedPercents,
                updateOilPercentWithGramRecalculation
            }}
        >
            {children}
        </SoapRecipeContext.Provider>
    );
};
