import {FC} from "react";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {leySetupStyles} from "../styles/LyeSetup.styles";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {setSuperfatPercent} from "../../recipe-calculation/model/recipeSlice";


export const SuperfatSetup: FC = () => {

    const text = localization.ru.soap_controls;

    const dispatch = useAppDispatch();
    const handleSuperfatPercentChange = (value: number) => dispatch(setSuperfatPercent(value))


    const {appTheme} = useTheme();
    const {layout, theme} = leySetupStyles[appTheme];

    const {superfatPercent} = useAppSelector((state) => state.recipe.input.params);


    return (
        <InputBlockWrapper className={clsx(layout.wrapper, "w-full")}>
            <div className={layout.toggleTypeBlock}>

                <label
                    className={clsx(theme.label, layout.label)}>{text.label_superfat_percent}
                </label>

                <div className={layout.fieldInner}>
                    <SmartNumberInput
                        decimalPlaces={0}
                        value={superfatPercent}
                        onChange={handleSuperfatPercentChange}
                        placeholder={text.placeholder_percent}
                        min={0}
                        max={20}
                        className={clsx(layout.input, theme.input)}
                    />
                    <span className={theme.unitText}>{text.placeholder_percent}</span>
                </div>
            </div>
        </InputBlockWrapper>

    );
};
