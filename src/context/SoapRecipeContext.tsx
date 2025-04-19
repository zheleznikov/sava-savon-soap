import {createContext, ReactNode, useState} from "react";
import {TOil} from "../data/oils2";

export type InputType = "gram" | "percent";
export type LyeType = "NaOH" | "KOH";

export type TGram = "gram";
export type TPercent = "percent";
export type TNaOH = "NaOH";
export type TKOH = "KOH";

export interface SoapRecipeContextType {
    recipeName: string;
    setRecipeName: (val: string) => void;

    inputType: InputType;
    setInputType: (val: InputType) => void;


    lyeType: LyeType;
    setLyeType: (val: LyeType) => void;

    waterPercent: number;
    setWaterPercent: (val: number) => void;

    superfatPercent: number;
    setSuperfatPercent: (val: number) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;

    selectedOils: TOil[];
    setSelectedOils: (val: TOil[]) => void;
    handleToggleOil: (oil: TOil) => void;
    updateOilGramWithRecalculatedPercents: (oil:TOil, newGram: number) => void;
    updateOilPercentWithGramRecalculation: (oil: TOil, newPercent: number, totalOilMass: number) => void;

}


const recalculatePercents = (oils: TOil[]): TOil[] => {
    const totalGram = oils.reduce((sum, o) => sum + (o.gram || 0), 0);
    return oils.map(o => ({
        ...o,
        percent: totalGram > 0 ? (o.gram / totalGram) * 100 : 0,
    }));
};

export const SoapRecipeContext = createContext<SoapRecipeContextType | undefined>(undefined);

export const SoapRecipeProvider = ({ children }: { children: ReactNode }) => {

    const [recipeName, setRecipeName] = useState("");
    const [inputType, setInputType] = useState<InputType>("gram");
    const [lyeType, setLyeType] = useState<LyeType>("NaOH");
    const [waterPercent, setWaterPercent] = useState(30);
    const [superfatPercent, setSuperfatPercent] = useState(5);
    const [selectedOils, setSelectedOils] = useState<TOil[]>([]);
    const [userDefinedTotalWeight, setUserDefinedTotalWeight] = useState(100);


    const handleToggleOil = (oil: TOil) => {
        setSelectedOils((prev) => {
            const isSelected = prev.some((o) => o.id === oil.id);
            const updated = isSelected
                ? prev.filter((o) => o.id !== oil.id)
                : [...prev, oil];

            return recalculatePercents(updated);
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
                inputType, setInputType,
                lyeType, setLyeType,
                waterPercent, setWaterPercent,
                superfatPercent, setSuperfatPercent,
                selectedOils, setSelectedOils,
                userDefinedTotalWeight, setUserDefinedTotalWeight,

                handleToggleOil,
                updateOilGramWithRecalculatedPercents,
                updateOilPercentWithGramRecalculation
            }}
        >
            {children}
        </SoapRecipeContext.Provider>
    );
};