import {FC} from "react";
import {useSoapRecipe} from "../../recipe-calculation/model/useSoapRecipe";
import {SmartNumberInput} from "@/shared/smart-number-input";
import {useSoapCalculations} from "../../recipe-calculation/model/useSoapCalculations";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared/ui/InputBlockWrapper";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {useTheme} from "../../../app/providers/ThemeContext";
import {inputTypeSetupStyles} from "@/feature/recipe-setup";


const l = localization.ru.input_type_toggle;
export const InputTypeSetup: FC = () => {

    const {
        inputType,
        setInputType,
        userDefinedTotalWeight,
        setUserDefinedTotalWeight
    } = useSoapRecipe();

    const {totalResultAmount} = useSoapCalculations();

    const isGramMode = inputType === InputType.Gram;
    const {appTheme} = useTheme();
    const {layout, theme} = inputTypeSetupStyles[appTheme];

    return (
        <InputBlockWrapper>
            <div className={layout.wrapper}>

                {/* Режим ввода */}
                <div className={layout.fieldWrapper}>
                    <label className={clsx(theme.label, layout.label)}>
                        {l.label_input_type}
                    </label>

                    <div className={layout.buttonGroup}>
                        <button
                            type="button"
                            onClick={() => setInputType(InputType.Gram)}
                            className={clsx(
                                theme.buttonBase,
                                isGramMode ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {l.button_grams}
                        </button>

                        <button
                            type="button"
                            onClick={() => setInputType(InputType.Percent)}
                            className={clsx(
                                theme.buttonBase,
                                inputType === InputType.Percent ? theme.buttonActive : theme.buttonInactive
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
                            onChange={isGramMode ? () => {} : setUserDefinedTotalWeight}
                            disabled={isGramMode}
                            placeholder={l.placeholder_grams}
                            min={10}
                            max={10000}
                            className={clsx(
                                theme.inputBase,
                                isGramMode ? theme.inputDisabled : theme.input
                            )}
                        />
                        <span className={theme.unitText}>
                        {l.unit_grams}
                    </span>
                    </div>

                    <p className={clsx(
                        theme.hint,
                        isGramMode ? theme.hintVisible : theme.hintHidden
                    )}>
                        {l.hint_automatic}
                    </p>
                </div>
            </div>
        </InputBlockWrapper>
    );
};
