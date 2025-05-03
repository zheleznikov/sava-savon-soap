import {FC} from "react";
import {Trash2} from "lucide-react";
import {TOil} from "../../../entities/oil/model/oil.types";
import {useSoapRecipe} from "../../recipe-calculation/model/useSoapRecipe";
import {useSoapCalculations} from "../../recipe-calculation/model/useSoapCalculations";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {oilAddedLineStyles} from "../styles/OilAddedLine.styes";
import {localization} from "@/shared/config/localization";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";

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

    return (
        <div className={theme.block}>
            <div className={layout.topRow}>
                <div className={theme.name}>{oil.name_rus}</div>

                <button
                    onClick={() => handleToggleOil(oil)}
                    className={theme.deleteButton}
                    title={t.delete_button_title}
                >
                    <Trash2 size={20}/>
                </button>
            </div>

            <div className={layout.bottomRow}>
                <div className={layout.inputWrapper}>
                    <SmartNumberInput
                        placeholder={t.placeholder_grams}
                        value={oil.gram || 0}
                        onChange={newGram =>
                            updateOilGramWithRecalculatedPercents(oil, newGram)
                        }
                        disabled={isPercentMode}
                        className={clsx(layout.input,
                            isPercentMode ? theme.inputDisabled : theme.input
                        )}                    />
                    <span className={theme.unitText}>{t.unit_grams}</span>
                </div>

                <div className={layout.inputWrapper}>
                    <SmartNumberInput
                        placeholder={t.placeholder_percent}
                        value={oil.percent || 0}
                        onChange={newPercent =>
                            updateOilPercentWithGramRecalculation(oil, newPercent, totalOilAmount)
                        }
                        disabled={isGramMode}
                        className={clsx(layout.input,
                            isGramMode ? theme.inputDisabled : theme.input
                        )}
                    />
                    <span className={theme.unitText}>{t.unit_percent}</span>
                </div>
            </div>
        </div>
    );
};