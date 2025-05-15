import {FC, useState} from "react";
import {ChevronDown, ChevronUp, Trash2} from "lucide-react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {oilAddedLineStyles} from "../styles/OilAddedLine.styes";
import {localization} from "@/shared/config/localization";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {formatNumber} from "../../../shared/lib/utils";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {useAppSelector} from "../../../shared/useAppSelector";
import {
    setAcidInputType,
    toggleAcid,
    updateAcidGramWithRecalculatedPercents,
    updateAcidPercentWithGramRecalculation
} from "../../recipe-calculation/model/recipeSlice";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";


interface Props {
    acid: TAcid;
}

export const AcidAddedLine: FC<Props> = ({acid}) => {


    const dispatch = useAppDispatch();

    // Селекторы
    const {acidInputType, totalAcidAmount, totalOilAmount} = useAppSelector((state) => state.recipe);

    const handleToggleAcid = () => dispatch(toggleAcid(acid));

    const handleUpdateAcidGram = (newGram: number) =>
        dispatch(updateAcidGramWithRecalculatedPercents({ acidId: acid.id, newGram, totalOil: totalOilAmount }));

    const handleUpdateAcidPercent = (newPercent: number) =>
        dispatch(updateAcidPercentWithGramRecalculation({ acidId: acid.id, newPercent, totalOilMass: totalOilAmount }));


    const handleChange = (type: InputType) => {
        dispatch(setAcidInputType(type));
    };


    const isGramMode = acidInputType === InputType.Gram;
    const isPercentMode = acidInputType === InputType.Percent;

    const {appTheme} = useTheme();

    const {layout, theme} = oilAddedLineStyles[appTheme];
    const t = localization.ru.oil_line;

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const toggleDetails = () => setIsDetailsOpen(prev => !prev);


    return (
        <div className={theme.block}>
            <div className={layout.blockInner}>
                <div className={layout.topRow}>
                    <div className={theme.name}>{acid.name_rus}</div>
                    <button onClick={handleToggleAcid} className={theme.deleteButton}
                            title={t.delete_button_title}>
                        <Trash2 size={24}/>
                    </button>
                </div>

                <div className={layout.bottomRow}>
                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={t.placeholder_grams}
                            value={acid.gram || 0}
                            onChange={newGram => handleUpdateAcidGram(newGram)}
                            disabled={isPercentMode}
                            className={clsx(layout.input, isPercentMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_grams}</span>
                    </div>

                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            min={1} max={5}
                            placeholder={t.placeholder_percent}
                            value={acid.percent || 0}
                            onChange={newPercent => handleUpdateAcidPercent(newPercent)}
                            disabled={isGramMode}
                            className={clsx(layout.input, isGramMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_percent}</span>
                    </div>

                    <ToggleButtonGroup
                        options={[
                            {label: "г", value: InputType.Gram},
                            {label: "%", value: InputType.Percent}

                        ]}
                        onChange={handleChange}
                        isActive={(val) => val === acidInputType}
                    />

                </div>

                <button
                    onClick={toggleDetails}
                    className={clsx(theme.expandButton, layout.expandButton)}
                    title={isDetailsOpen ? t.expand_title_open : t.expand_title_closed}
                >
                    <span
                        className={theme.expandLabel}>{isDetailsOpen ? t.expand_less : "О кислоте"}</span>
                    {isDetailsOpen ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
                </button>
            </div>

            {isDetailsOpen && (
                <div className={clsx(layout.details, theme.details)}>

                    <hr className={layout.sectionSpacing} />

                    <div>
                        <div className={layout.sectionTitle}>Нейтрализация</div>
                        <ul className={layout.ul}>
                            <li>{t.lye_naoh}: <span className={theme.valueNumber}>{formatNumber(acid.neutralization.naoh, 3)}</span></li>
                            <li>{t.lye_koh}: <span className={theme.valueNumber}>{formatNumber(acid.neutralization.koh, 3)}</span></li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
};
