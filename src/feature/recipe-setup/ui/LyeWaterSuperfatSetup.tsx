import {FC} from "react";
import {useSoapRecipe} from "@/feature/recipe-calculation/model/useSoapRecipe";
import {LyeType} from "@/app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {lyeWaterSuperfatSetupStyles} from "@/feature/recipe-setup";
import {clsx} from "clsx";
import {SmartNumberInput} from "@/shared/smart-number-input";


const l = localization.ru.soap_controls;
export const LyeWaterSuperfatSetup: FC = () => {

    const {
        lyeType, setLyeType,
        waterPercent, setWaterPercent,
        superfatPercent, setSuperfatPercent,
    } = useSoapRecipe();


    const {appTheme} = useTheme();
    const {layout, theme} = lyeWaterSuperfatSetupStyles[appTheme];

    return (
        <InputBlockWrapper className={layout.wrapper}>

            {/* Строка 1 — выбор щёлочи */}
            <div className={layout.lyeTypeRow}>
                <label className={clsx(theme.label, layout.label)}>{l.label_lye_type}</label>
                <div className={layout.buttonGroup}>
                    {
                        [LyeType.NaOH, LyeType.KOH].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setLyeType(type as LyeType.NaOH | LyeType.KOH)}
                                className={clsx(
                                    theme.buttonBase,
                                    lyeType === type ? theme.buttonActive : theme.buttonInactive
                                )}
                            >
                                {type}
                            </button>
                        ))
                    }
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