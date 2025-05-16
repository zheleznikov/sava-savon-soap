import { useEffect } from "react";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useDebounce} from "../../../shared/model/useDebounce";
import {calculateRecipe} from "./recipeSlice";


export const useAutoRecalculate = () => {
    const dispatch = useAppDispatch();

    const {
        selectedOils,
        selectedAcids,
        selectedCustoms
    } = useAppSelector((state) => state.recipe.input.ingredients);

    const {
        oilInputType,
        userDefinedTotalWeight,
        waterInput,
        superfatPercent,
        lyeTypeInput
    } = useAppSelector((state) => state.recipe.input.params);

    const debouncedOils = useDebounce(selectedOils);
    const debouncedAcids = useDebounce(selectedAcids);
    const debouncedCustoms = useDebounce(selectedCustoms);
    const debouncedUserDefinedWeight = useDebounce(userDefinedTotalWeight);
    const debouncedSuperfat = useDebounce(superfatPercent);
    const debouncedWaterPercent = useDebounce(waterInput.waterPercent);
    const debouncedLyeType = useDebounce(lyeTypeInput.lyeType);

    useEffect(() => {
        dispatch(calculateRecipe());
    }, [
        debouncedOils,
        debouncedAcids,
        debouncedCustoms,
        oilInputType,
        debouncedUserDefinedWeight,
        waterInput.waterInputType,
        debouncedWaterPercent,
        waterInput.lyeConcentration,
        waterInput.waterLyeRatio,
        debouncedSuperfat,
        debouncedLyeType,
        lyeTypeInput.NaOHPurity,
        lyeTypeInput.KOHPurity,
        lyeTypeInput.NaOHPercentageInMixed,
        lyeTypeInput.KOHPercentageInMixed
    ]);
};
