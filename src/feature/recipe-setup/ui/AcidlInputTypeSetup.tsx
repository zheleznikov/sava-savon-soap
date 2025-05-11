import {FC} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {useTheme} from "../../../app/providers/ThemeContext";
import {inputTypeSetupStyles} from "@/feature/recipe-setup";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {setAcidInputType} from "../../recipe-calculation/model/recipeSlice";
import {useAppSelector} from "../../../shared/useAppSelector";


const l = localization.ru.input_type_toggle;
export const AcidInputTypeSetup: FC = () => {

    const dispatch = useAppDispatch();
    const acidInputType = useAppSelector((state) => state.recipe.acidInputType);

    const handleChange = (type: InputType) => {
        dispatch(setAcidInputType(type));
    };


    const isGramMode = acidInputType === InputType.Gram;
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
                            onClick={() => handleChange(InputType.Gram)}
                            className={clsx(
                                theme.buttonBase,
                                isGramMode ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {l.button_grams}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleChange(InputType.Percent)}
                            className={clsx(
                                theme.buttonBase,
                                acidInputType === InputType.Percent ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {l.button_percent}
                        </button>
                    </div>
                </div>

            </div>
        </InputBlockWrapper>
    );
};
