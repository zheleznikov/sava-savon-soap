import {FC} from "react";
import {SmartNumberInput} from "../../shared/ui/SmartNumberInput";
import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";
import {LyeType} from "../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../shared/ui/InputBlockWrapper";
import {localization} from "../../shared/config/localization";
import {input} from "../../shared/styles/layout";


const l = localization.ru.soap_controls;
const s = input.basic_params;
export const BasicParamsBlock: FC = () => {

    const {
        lyeType, setLyeType,
        waterPercent, setWaterPercent,
        superfatPercent, setSuperfatPercent,
    } = useSoapRecipe();


    return (
        <InputBlockWrapper className={s.layout.wrapper}>

            {/* Строка 1 — выбор щёлочи */}
            <div className={s.layout.lye_type_row}>
                <label className={s.theme.light.label}>{l.label_lye_type}</label>
                <div className={s.layout.button_group}>
                    {[LyeType.NaOH, LyeType.KOH].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setLyeType(type as LyeType.NaOH | LyeType.KOH)}
                            className={`${s.theme.light.button_base} ${
                                lyeType === type
                                    ? s.theme.light.button_active
                                    : s.theme.light.button_inactive
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Строка 2 — вода и пережир */}
            <div className={s.layout.param_row}>
                {/* Вода */}
                <div className={s.layout.field_wrapper}>
                    <label className={s.theme.light.label}>{l.label_water_percent}</label>
                    <div className={s.layout.field_inner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={waterPercent}
                            onChange={setWaterPercent}
                            placeholder="%"
                            min={10}
                            max={100}
                            className={s.layout.input}
                        />
                        <span className={s.theme.light.unit_text}>{l.placeholder_percent}</span>
                    </div>
                </div>

                {/* Пережир */}
                <div className={s.layout.field_wrapper}>
                    <label className={s.theme.light.label}>{l.label_superfat_percent}</label>
                    <div className={s.layout.field_inner}>
                        <SmartNumberInput
                            decimalPlaces={0}
                            value={superfatPercent}
                            onChange={setSuperfatPercent}
                            placeholder={l.placeholder_percent}
                            min={0}
                            max={20}
                            className={s.layout.input}
                        />
                        <span className={s.theme.light.unit_text}>{l.placeholder_percent}</span>
                    </div>
                </div>
            </div>

        </InputBlockWrapper>
    );
};