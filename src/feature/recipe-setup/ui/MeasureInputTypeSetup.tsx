import {FC} from "react";
import {MeasureInputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {useTheme} from "../../../app/providers/ThemeContext";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {setMeasureInput} from "../../recipe-calculation/model/recipeSlice";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";
import {leySetupStyles} from "../styles/LyeSetup.styles";


export const MeasureInputTypeSetup: FC = () => {

    const text = localization.ru.input_type_toggle;

    const dispatch = useAppDispatch();

    const {measureInput} = useAppSelector((state) => state.recipe);

    const handleSetMeasureInputType = (type: MeasureInputType) => dispatch(setMeasureInput(type))

    const {appTheme} = useTheme();
    const {layout, theme} = leySetupStyles[appTheme];

    return (
        <InputBlockWrapper className={"w-full"}>
            <div className={layout.wrapper}>

                <div className={layout.toggleTypeBlock}>
                    <label className={clsx(theme.label, layout.label)}>
                        {text.measure_input_type}
                    </label>

                    <ToggleButtonGroup
                        options={[
                            {label: text.button_grams, value: MeasureInputType.Gram},
                            {label: text.button_ounces, value: MeasureInputType.Ounces},
                        ]}
                        onChange={handleSetMeasureInputType}
                        isActive={(val) => val === measureInput}
                    />

                </div>


            </div>
        </InputBlockWrapper>
    );
};
