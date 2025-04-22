import {FC} from "react";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapCalculations} from "../recipe-calculation/model/useSoapCalculations";
import {InputType} from "../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {clsx} from "clsx";
import {input} from "../../shared/styles/layout";

export const InputTypeToggle: FC = () => {
    const {
        inputType,
        setInputType,
        userDefinedTotalWeight,
        setUserDefinedTotalWeight
    } = useSoapRecipe();

    const {totalResultAmount} = useSoapCalculations();

    const isGramMode = inputType === InputType.Gram;


    return (
        <InputBlockWrapper>
            <div className={input.toggle_input_type.layout.wrapper}>
                {/* Режим ввода */}
                <div className={input.toggle_input_type.layout.field_wrapper}>
                    <label className={input.toggle_input_type.theme.light.label}>Режим ввода</label>
                    <div className={input.toggle_input_type.theme.light.button_group}>
                        <button
                            type="button"
                            onClick={() => setInputType(InputType.Gram)}
                            className={clsx(
                                input.toggle_input_type.theme.light.button_base,
                                isGramMode ? input.toggle_input_type.theme.light.button_active : input.toggle_input_type.theme.light.button_inactive
                            )}
                        >
                            Граммы
                        </button>
                        <button
                            type="button"
                            onClick={() => setInputType(InputType.Percent)}
                            className={clsx(
                                input.toggle_input_type.theme.light.button_base,
                                inputType === InputType.Percent ? input.toggle_input_type.theme.light.button_active : input.toggle_input_type.theme.light.button_inactive
                            )}
                        >
                            Проценты
                        </button>
                    </div>
                </div>

                {/* Общий вес мыла */}
                <div className={input.toggle_input_type.layout.field_wrapper}>
                    <label className={input.toggle_input_type.theme.light.label}>Общий вес мыла</label>
                    <div className={input.toggle_input_type.layout.weight_row}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                            onChange={isGramMode ? () => {} : setUserDefinedTotalWeight}
                            disabled={isGramMode}
                            placeholder="граммы"
                            min={10}
                            max={10000}
                            className={clsx(
                                input.toggle_input_type.theme.light.input_base,
                                isGramMode && input.toggle_input_type.theme.light.input_disabled
                            )}
                        />
                        <span className={input.toggle_input_type.theme.light.unit_text}>г</span>
                    </div>
                    <p
                        className={clsx(
                            input.toggle_input_type.theme.light.hint,
                            isGramMode ? input.toggle_input_type.theme.light.hint_visible : input.toggle_input_type.theme.light.hint_hidden
                        )}
                    >
                        Рассчитывается автоматически по сумме масел
                    </p>
                </div>
            </div>
        </InputBlockWrapper>
    );
};

