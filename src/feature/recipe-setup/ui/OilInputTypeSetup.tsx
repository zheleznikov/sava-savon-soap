import {FC} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {useTheme} from "../../../app/providers/ThemeContext";
import {SmartNumberInput} from "../../../shared";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {
    setOilInputType,
    setUserDefinedTotalWeight
} from "../../recipe-calculation/model/recipeSlice";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";
import {leySetupStyles} from "../styles/LyeSetup.styles";



export const OilInputTypeSetup: FC = () => {

    const text = localization.ru.input_type_toggle;

    const dispatch = useAppDispatch();

    const {
        oilInputType,
        userDefinedTotalWeight,
        totalResultAmount
    } = useAppSelector((state) => state.recipe);

    const handleSetOilInputType = (type: InputType) => dispatch(setOilInputType(type))

    const handleSetUserDefinedTotalWeight = (value: number) => dispatch(setUserDefinedTotalWeight(value))

    const isPercentMode = oilInputType === InputType.Percent;
    const {appTheme} = useTheme();
    const {layout, theme} = leySetupStyles[appTheme];

    return (
        <InputBlockWrapper className={""}>
            <div className={layout.wrapper}>

                <div className={layout.toggleTypeBlock}>
                    <label className={clsx(theme.label, layout.label)}>
                        {text.label_input_type}
                    </label>

                    <ToggleButtonGroup
                        options={[
                            {label: text.button_grams, value: InputType.Gram},
                            {label: text.button_ounces, value: InputType.Ounces},
                            {label: text.button_percent, value: InputType.Percent},
                        ]}
                        onChange={handleSetOilInputType}
                        isActive={(val) => val === oilInputType}
                    />

                </div>

                <div className={layout.toggleTypeBlock}>
                    <label className={clsx(theme.label, layout.label)}>
                        {text.label_total_weight}
                    </label>

                    <div className={layout.fieldInner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={isPercentMode ? userDefinedTotalWeight : totalResultAmount}
                            onChange={!isPercentMode ? () => {} : handleSetUserDefinedTotalWeight}
                            disabled={!isPercentMode}
                            // placeholder={text.placeholder_grams}
                            min={10}
                            max={10000}
                            className={clsx(
                                // theme.input,
                                isPercentMode ? theme.input : theme.inputDisabled
                            )}
                        />
                    </div>


                </div>
            </div>
        </InputBlockWrapper>
    );
};
