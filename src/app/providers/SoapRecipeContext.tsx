import {createContext, ReactNode, useState} from "react";
import {TOil} from "../../entities/oil/model/oil.types";
import {InputType, LyeType, SoapRecipeContextType} from "./SoapRecipeContext.types";
import {recalculatePercents} from "../../feature/recipe-calculation";
import {oils} from "../../entities/oil/model/oils";
import {TAcid} from "../../entities/oil/model/acids.types";

export const SoapRecipeContext = createContext<SoapRecipeContextType | undefined>(undefined);

export const SoapRecipeProvider = ({ children }: { children: ReactNode }) => {

    const defaultSelectedOils = oils.filter(oil => [2, 1, 29].includes(oil.id));
    const [selectedOils, setSelectedOils] = useState<TOil[]>(defaultSelectedOils);
    const [selectedAcids, setSelectedAcids] = useState<TAcid []>([]);

    const [recipeName, setRecipeName] = useState("");
    const [oilInputType, setOilInputType] = useState<InputType>(InputType.Gram);
    const [lyeType, setLyeType] = useState<LyeType>(LyeType.NaOH);
    const [waterPercent, setWaterPercent] = useState(33);
    const [superfatPercent, setSuperfatPercent] = useState(5);

    const [userDefinedTotalWeight, setUserDefinedTotalWeight] = useState(0);

    const [acidInputType, setAcidInputType] = useState<InputType>(InputType.Gram);


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


    // todo добавить пересчет кислот, если вес кислот указан в процентах

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

        const updatedAcids = selectedAcids.map((a) => ({
            ...a,
            gram: acidInputType === InputType.Percent && totalGram > 0 ? (a.percent / 100) * totalGram : a.gram,
            percent: acidInputType === InputType.Gram && totalGram > 0 ? (a.gram / totalGram) * 100 : a.percent,
        }));

        setSelectedAcids(updatedAcids);


    };

    // todo отладить функцию, чтобы при измнении веса и если тип граммы, то увеличивался бы общий вес
    const updateAcidGramWithRecalculatedPercents = (acid: TAcid, newGram: number, totalOilSum: number) => {
        const updatedAcidsBase = selectedAcids.map((a) =>
            a.id === acid.id ? { ...a, gram: newGram } : a
        );

        const updatedAcids = updatedAcidsBase.map((a) => ({
            ...a,
            percent: totalOilSum > 0 ? (a.gram / totalOilSum) * 100 : 0,
        }));

        setSelectedAcids(updatedAcids);
    };

    // const updateAcidGramWithRecalculatedPercents = (
    //     acid: TAcid,
    //     newGram: number,
    //     totalOilSum: number
    // ) => {
    //     const updatedAcidsBase = selectedAcids.map((a) =>
    //         a.id === acid.id ? { ...a, gram: newGram } : a
    //     );
    //
    //     const updatedAcids = updatedAcidsBase.map((a) => ({
    //         ...a,
    //         percent: totalOilSum > 0 ? (a.gram / totalOilSum) * 100 : 0,
    //     }));
    //
    //     const hasChanged = updatedAcids.some((a, i) => {
    //         const prev = selectedAcids[i];
    //         return a.gram !== prev.gram || a.percent !== prev.percent;
    //     });
    //
    //     if (hasChanged) {
    //         setSelectedAcids(updatedAcids);
    //     }
    // };


    // todo добавить пересчет кислот, если вес указан в процентах. Разобраьтся
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

    const updateAcidPercentWithGramRecalculation = (acid: TAcid, newPercent: number, totalOilSum: number) => {
        const updatedAcids = selectedAcids.map((a) =>
            a.id === acid.id
                ? {
                    ...a,
                    percent: newPercent,
                    gram: totalOilSum > 0 ? (newPercent / 100) * totalOilSum : 0,
                }
                : a
        );

        setSelectedAcids(updatedAcids);
    };

    return (
        <SoapRecipeContext.Provider
            value={{
                recipeName, setRecipeName,
                oilInputType, setOilInputType,
                acidInputType, setAcidInputType,
                lyeType, setLyeType,
                waterPercent, setWaterPercent,
                superfatPercent, setSuperfatPercent,
                selectedOils, setSelectedOils,
                userDefinedTotalWeight, setUserDefinedTotalWeight,
                selectedAcids, setSelectedAcids,
                handleToggleAcid,
                handleToggleOil,
                updateOilGramWithRecalculatedPercents,
                updateOilPercentWithGramRecalculation,
                updateAcidGramWithRecalculatedPercents,
                updateAcidPercentWithGramRecalculation
            }}
        >
            {children}
        </SoapRecipeContext.Provider>
    );
};
