import {FC} from "react";
import {LyeType} from "@/app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {lyeWaterSuperfatSetupStyles} from "@/feature/recipe-setup";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {
    setLyeType,
    setSuperfatPercent,
    setWaterPercent
} from "../../recipe-calculation/model/recipeSlice";


const l = localization.ru.soap_controls;
export const LyeWaterSuperfatSetup: FC = () => {

    const dispatch = useAppDispatch();

    const handleSetLyeType = (leyType: LyeType) => {
        dispatch(setLyeType(leyType));
    };

    const handleWaterPercentChange = (value: number) => {
        dispatch(setWaterPercent(value));
    };

    const handleSuperfatPercentChange = (value: number ) => {
        dispatch(setSuperfatPercent(value));
    };


    const {appTheme} = useTheme();
    const {layout, theme} = lyeWaterSuperfatSetupStyles[appTheme];

    const {lyeType, waterPercent, superfatPercent} = useAppSelector((state) => state.recipe);

    const isNaOHMode = lyeType === LyeType.NaOH;

    return (
        <div className={"flex flex-col md:flex-row gap-2"}>
            <InputBlockWrapper className={clsx(layout.wrapper, "w-full lg:w-1/4")}>

                {/* Строка 1 — выбор щёлочи */}
                <div className={layout.lyeTypeRow}>
                    <label className={clsx(theme.label, layout.label)}>
                        {l.label_lye_type}
                    </label>
                    <div className={layout.buttonGroup}>

                        <button
                            type="button"
                            onClick={() => handleSetLyeType(LyeType.NaOH)}
                            className={clsx(
                                theme.buttonBase,
                                isNaOHMode ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {LyeType.NaOH}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSetLyeType(LyeType.KOH)}
                            className={clsx(
                                theme.buttonBase,
                                !isNaOHMode ? theme.buttonActive : theme.buttonInactive
                            )}
                        >
                            {LyeType.KOH}
                        </button>
                    </div>
                </div>


            </InputBlockWrapper>

            <InputBlockWrapper className={clsx(layout.wrapper, "w-full lg:w-3/4 flex justify-between")}>

                {/* Строка 2 — вода и пережир */}
                <div className={layout.paramRow}>
                    {/* Вода */}
                    <div className={layout.fieldWrapper}>
                        <label className={clsx(theme.label, layout.label)}>{l.label_water_percent}</label>
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
                        <label className={clsx(theme.label, layout.label)}>{l.label_superfat_percent}</label>
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


        </div>
    );
};
