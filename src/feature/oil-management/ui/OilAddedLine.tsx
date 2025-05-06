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


interface Props {
    oil: TOil;
}

export const OilAddedLine: FC<Props> = ({oil}) => {
    const {
        handleToggleOil,
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
                    <div className={theme.name}>{oil.name_rus}</div>
                    <button onClick={() => handleToggleOil(oil)} className={theme.deleteButton}
                            title={t.delete_button_title}>
                        <Trash2 size={24}/>
                    </button>
                </div>

                <div className={layout.bottomRow}>
                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={t.placeholder_grams}
                            value={oil.gram || 0}
                            onChange={newGram => updateOilGramWithRecalculatedPercents(oil, newGram)}
                            disabled={isPercentMode}
                            className={clsx(layout.input, isPercentMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_grams}</span>
                    </div>

                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={t.placeholder_percent}
                            value={oil.percent || 0}
                            onChange={newPercent => updateOilPercentWithGramRecalculation(oil, newPercent, totalOilAmount)}
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
                        className={theme.expandLabel}>{isDetailsOpen ? t.expand_less : t.expand_more}</span>
                    {isDetailsOpen ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
                </button>
            </div>

            {isDetailsOpen && (
                <div className={clsx(layout.details, theme.details)}>
                    <hr className={layout.hr} />

                    <div className={clsx("mb-2", layout.sectionSpacing)}>
                        <div className={layout.sectionTitle}>{t.section_properties}</div>
                        <ul className={layout.ul}>
                            <li>{t.property_hardness}: <span className={theme.valueNumber}>{oil.properties?.hardness}</span></li>
                            <li>{t.property_cleansing}: <span className={theme.valueNumber}>{oil.properties?.cleansing}</span></li>
                            <li>{t.property_soften}: <span className={theme.valueNumber}>{oil.properties?.soften}</span></li>
                            <li>{t.property_bubbling}: <span className={theme.valueNumber}>{oil.properties?.bubbling}</span></li>
                            <li>{t.property_creaminess}: <span className={theme.valueNumber}>{oil.properties?.creaminess}</span></li>
                            <li>{t.property_iodine}: <span className={theme.valueNumber}>{oil.iodine}</span></li>
                        </ul>
                    </div>

                    <hr className={layout.sectionSpacing} />

                    <div>
                        <div className={layout.sectionTitle}>{t.section_fatty_acids}</div>
                        <ul className={layout.ul}>
                            <li>{t.fatty_acid_lauric}: <span className={theme.valueNumber}>{oil.fatty_acids?.lauric}%</span></li>
                            <li>{t.fatty_acid_myristine}: <span className={theme.valueNumber}>{oil.fatty_acids?.myristine}%</span></li>
                            <li>{t.fatty_acid_palmitic}: <span className={theme.valueNumber}>{oil.fatty_acids?.palmitic}%</span></li>
                            <li>{t.fatty_acid_stearin}: <span className={theme.valueNumber}>{oil.fatty_acids?.stearin}%</span></li>
                            <li>{t.fatty_acid_ricin}: <span className={theme.valueNumber}>{oil.fatty_acids?.ricin}%</span></li>
                            <li>{t.fatty_acid_oleic}: <span className={theme.valueNumber}>{oil.fatty_acids?.oleic}%</span></li>
                            <li>{t.fatty_acid_linoleic}: <span className={theme.valueNumber}>{oil.fatty_acids?.linoleic}%</span></li>
                            <li>{t.fatty_acid_linolenic}: <span className={theme.valueNumber}>{oil.fatty_acids?.linolenic}%</span></li>
                        </ul>
                    </div>

                    <hr className={layout.sectionSpacing} />

                    <div>
                        <div className={layout.sectionTitle}>{t.section_lye}</div>
                        <ul className={layout.ul}>
                            <li>{t.lye_naoh}: <span className={theme.valueNumber}>{formatNumber(oil.sap.naoh, 3)}</span></li>
                            <li>{t.lye_koh}: <span className={theme.valueNumber}>{formatNumber(oil.sap.koh, 3)}</span></li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
};
