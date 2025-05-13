import {FC} from "react";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {lyeWaterSuperfatSetupStyles} from "@/feature/recipe-setup";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {setSuperfatPercent, setWaterPercent} from "../../recipe-calculation/model/recipeSlice";


const l = localization.ru.soap_controls;
export const WaterSuperfatSetup: FC = () => {

    const dispatch = useAppDispatch();


    const handleWaterPercentChange = (value: number) => {
        dispatch(setWaterPercent(value));
    };

    const handleSuperfatPercentChange = (value: number) => {
        dispatch(setSuperfatPercent(value));
    };


    const {appTheme} = useTheme();
    const {layout, theme} = lyeWaterSuperfatSetupStyles[appTheme];

    const {waterPercent, superfatPercent} = useAppSelector((state) => state.recipe);


    return (

        <InputBlockWrapper className={clsx(layout.wrapper, "w-full flex justify-between")}>

            {/* Строка 2 — вода и пережир */}
            <div className={layout.paramRow}>
                {/* Вода */}
                <div className={layout.fieldWrapper}>
                    <label
                        className={clsx(theme.label, layout.label)}>{l.label_water_percent}</label>
                    <div className={layout.fieldInner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={waterPercent}
                            onChange={handleWaterPercentChange}
                            placeholder="%"
                            min={10}
                            max={100}
                            className={`${layout.input} ${theme.input}`}
                        />
                        <span className={theme.unitText}>{l.placeholder_percent}</span>
                    </div>
                </div>

                {/* Пережир */}
                <div className={layout.fieldWrapper}>
                    <label
                        className={clsx(theme.label, layout.label)}>{l.label_superfat_percent}</label>
                    <div className={layout.fieldInner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={superfatPercent}
                            onChange={handleSuperfatPercentChange}
                            placeholder={l.placeholder_percent}
                            min={0}
                            max={20}
                            className={clsx(layout.input, theme.input)}
                        />
                        <span className={theme.unitText}>{l.placeholder_percent}</span>
                    </div>
                </div>
            </div>

        </InputBlockWrapper>


    );
};
