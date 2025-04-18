// context/SoapRecipeContext.tsx
import {createContext, ReactNode, useState} from "react";
import {TOil} from "../data/oils2";

export type InputType = "gram" | "percent";
export type LyeType = "NaOH" | "KOH";

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

    selectedOils: TOil[];
    setSelectedOils: (val: TOil[]) => void;
    handleToggleOil: (oil: TOil) => void;
}

export const SoapRecipeContext = createContext<SoapRecipeContextType | undefined>(undefined);

export const SoapRecipeProvider = ({ children }: { children: ReactNode }) => {

    const [recipeName, setRecipeName] = useState("");
    const [inputType, setInputType] = useState<InputType>("gram");
    const [lyeType, setLyeType] = useState<LyeType>("NaOH");
    const [waterPercent, setWaterPercent] = useState(30);
    const [superfatPercent, setSuperfatPercent] = useState(5);
    const [selectedOils, setSelectedOils] = useState<TOil[]>([]);

    const handleToggleOil = (oil: TOil) => {
        setSelectedOils((prev) =>
            prev.some((o) => o.id === oil.id)
                ? prev.filter((o) => o.id !== oil.id)
                : [...prev, oil]
        );
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
                handleToggleOil
            }}
        >
            {children}
        </SoapRecipeContext.Provider>
    );
};