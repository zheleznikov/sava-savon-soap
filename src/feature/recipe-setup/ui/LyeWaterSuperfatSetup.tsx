import {FC} from "react";
import {useSoapRecipe} from "@/feature/recipe-calculation/model/useSoapRecipe";
import {LyeType} from "@/app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {lyeWaterSuperfatSetupStyles} from "@/feature/recipe-setup";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";


const l = localization.ru.soap_controls;
export const LyeWaterSuperfatSetup: FC = () => {

    const {
        lyeType, setLyeType,
        waterPercent, setWaterPercent,
        superfatPercent, setSuperfatPercent,
    } = useSoapRecipe();


    const {appTheme} = useTheme();
    const {layout, theme} = lyeWaterSuperfatSetupStyles[appTheme];

    const isNaOHMode = lyeType === LyeType.NaOH;

    return (
        <InputBlockWrapper className={layout.wrapper}>

            {/* Строка 1 — выбор щёлочи */}
            <div className={layout.lyeTypeRow}>
                <label className={clsx(theme.label, layout.label)}>
                    {l.label_lye_type}
                </label>
                <div className={layout.buttonGroup}>

                    <button
                        type="button"
                        onClick={() => setLyeType(LyeType.NaOH)}
                        className={clsx(
                            theme.buttonBase,
                            isNaOHMode ? theme.buttonActive : theme.buttonInactive
                        )}
                    >
                        {LyeType.NaOH}
                    </button>

                    <button
                        type="button"
                        onClick={() => setLyeType(LyeType.KOH)}
                        className={clsx(
                            theme.buttonBase,
                            !isNaOHMode ? theme.buttonActive : theme.buttonInactive
                        )}
                    >
                        {LyeType.KOH}
                    </button>
                </div>
            </div>

            {/* Строка 2 — вода и пережир */}
            <div className={layout.paramRow}>
                {/* Вода */}
                <div className={layout.fieldWrapper}>
                    <label className={clsx(theme.label, layout.label)}>{l.label_water_percent}</label>
                    <div className={layout.fieldInner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={waterPercent}
                            onChange={setWaterPercent}
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
                            onChange={setSuperfatPercent}
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