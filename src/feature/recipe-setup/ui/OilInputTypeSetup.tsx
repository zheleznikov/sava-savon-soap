import {FC} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {useTheme} from "../../../app/providers/ThemeContext";
import {inputTypeSetupStyles} from "@/feature/recipe-setup";
import {SmartNumberInput} from "../../../shared";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {
    setOilInputType,
    setUserDefinedTotalWeight
} from "../../recipe-calculation/model/recipeSlice";


const l = localization.ru.input_type_toggle;
export const OilInputTypeSetup: FC = () => {


    const dispatch = useAppDispatch();

    const {
        oilInputType,
        userDefinedTotalWeight,
        totalResultAmount
    } = useAppSelector((state) => state.recipe);

    const handleSetOilInputType = (type: InputType) => {
        dispatch(setOilInputType(type));
    };

    const handleSetUserDefinedTotalWeight = (value: number) => {
        dispatch(setUserDefinedTotalWeight(value));
    };


    const isGramMode = oilInputType === InputType.Gram;
    const {appTheme} = useTheme();
    const {layout, theme} = inputTypeSetupStyles[appTheme];

    return (
        <InputBlockWrapper className={""}>
            <div className={layout.wrapper}>

                {/* Режим ввода */}
                <div className={layout.fieldWrapper}>
                    <label className={clsx(theme.label, layout.label)}>
                        {l.label_input_type}
                    </label>

                    <div className={layout.buttonGroup}>
                        <button
                            type="button"
                            onClick={() => handleSetOilInputType(InputType.Gram)}
                            className={clsx(
                                theme.buttonBase,
                                isGramMode ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {l.button_grams}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSetOilInputType(InputType.Percent)}
                            className={clsx(
                                theme.buttonBase,
                                oilInputType === InputType.Percent ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {l.button_percent}
                        </button>
                    </div>
                </div>

                {/* Общий вес мыла */}
                <div className={layout.fieldWrapper}>
                    <label className={clsx(theme.label, layout.label)}>
                        {l.label_total_weight}
                    </label>

                    <div className={layout.weightRow}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                            onChange={isGramMode ? () => {} : handleSetUserDefinedTotalWeight}
                            disabled={isGramMode}
                            placeholder={l.placeholder_grams}
                            min={10}
                            max={10000}
                            className={clsx(
                                theme.inputBase,
                                isGramMode ? theme.inputDisabled : theme.input
                            )}
                        />
                    {/*    <span className={theme.unitText}>*/}
                    {/*    {l.unit_grams}*/}
                    {/*</span>*/}
                        <p className={clsx(
                            theme.hint,
                            isGramMode ? theme.hintVisible : theme.hintHidden
                        )}>
                            {l.hint_automatic}
                        </p>
                    </div>


                </div>
            </div>
        </InputBlockWrapper>
    );
};
