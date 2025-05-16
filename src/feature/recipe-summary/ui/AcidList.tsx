import {formatNumber} from "../../../shared/lib/utils";
import {FC} from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {
    MeasureInputType,
    measureInputTypeMeta
} from "../../../app/providers/SoapRecipeContext.types";


interface Props {
    selectedAcids: TAcid[];
    totalAcidAmount: number;
    measureInput: MeasureInputType
}

export const AcidList: FC<Props> = ({selectedAcids, totalAcidAmount, measureInput}) => {

    const t = localization.ru.acid_list;

    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const getRowClass = (index: number) => `${styles.rowBase} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t.title}</h4>

            <ul className={styles.list}>
                {selectedAcids.map((acid, index) => (
                    <li key={acid.id} className={getRowClass(index)}>
                        <span className={styles.name}>{acid.name_rus}</span>
                        <span className={styles.percent}>{formatNumber(acid.percent, 0)}{t.percent_unit}</span>
                        <span className={styles.gram}>{formatNumber(acid.gram, 0)} {measureInputTypeMeta[measureInput].ru.short}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.summary}>
                <span className={styles.summaryLabel}>{t.summary_label}</span>
                <span className={styles.summaryPercent}>—</span>
                <span className={styles.summaryGram}>{formatNumber(totalAcidAmount, 0)} {measureInputTypeMeta[measureInput].ru.short}</span>
            </div>
        </div>
    );
};
