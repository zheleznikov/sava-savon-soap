import {FC} from "react";
import {Trash2} from "lucide-react";
import {TOil} from "../../../entities/oil/model/oil.types";
import {useSoapRecipe} from "../../recipe-calculation";
import {useSoapCalculations} from "../../recipe-calculation";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {oilAddedLineStyles} from "../styles/OilAddedLine.styes";
import {localization} from "@/shared/config/localization";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {formatNumber} from "../../../shared/lib/utils";
import {TAcid} from "../../../entities/oil/model/acids.types";


interface Props {
    acid: TAcid;
}

export const AcidAddedLine: FC<Props> = ({acid}) => {

    const {
        handleToggleOil,
        handleToggleAcid,
        inputType,
        updateOilPercentWithGramRecalculation,
        updateOilGramWithRecalculatedPercents
    } = useSoapRecipe();

    const {totalOilAmount} = useSoapCalculations();

    const isGramMode = inputType === InputType.Gram;
    const isPercentMode = inputType === InputType.Percent;

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
                    <button onClick={() => handleToggleAcid(acid)} className={theme.deleteButton}
                            title={t.delete_button_title}>
                        <Trash2 size={24}/>
                    </button>
                </div>

                <div className={layout.bottomRow}>
                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={t.placeholder_grams}
                            value={acid.gram || 0}
                            // onChange={newGram => updateOilGramWithRecalculatedPercents(oil, newGram)}
                            onChange={() => {}}
                            disabled={isPercentMode}
                            className={clsx(layout.input, isPercentMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_grams}</span>
                    </div>

                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={t.placeholder_percent}
                            value={acid.percent || 0}
                            onChange={() => {}}

                            // onChange={newPercent => updateOilPercentWithGramRecalculation(oil, newPercent, totalOilAmount)}
                            disabled={isGramMode}
                            className={clsx(layout.input, isGramMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_percent}</span>
                    </div>
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
