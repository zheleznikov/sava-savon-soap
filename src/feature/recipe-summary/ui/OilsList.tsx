import {formatNumber} from "../../../shared/lib/utils";
import {TOil} from "../../../entities/oil/model/oil.types";
import {FC} from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {getTotalOilPercent} from "../utils/utils";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";


interface Props {
    selectedOils: TOil[];
    totalOilAmount: number;
}

export const OilsList: FC<Props> = ({selectedOils, totalOilAmount}) => {

    const t = localization.ru.oils_list;

    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const getRowClass = (index: number) => `${styles.rowBase} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`;

    const totalPercent = getTotalOilPercent(selectedOils);

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t.title}</h4>

            <ul className={styles.list}>
                {selectedOils.map((oil, index) => (
                    <li key={oil.id} className={getRowClass(index)}>
                        <span className={styles.name}>{oil.name_rus}</span>
                        <span className={styles.percent}>{formatNumber(oil.percent, 0)}{t.percent_unit}</span>
                        <span className={styles.gram}>{formatNumber(oil.gram, 0)} {t.gram_unit}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.summary}>
                <span className={styles.summaryLabel}>{t.summary_label}</span>
                <span className={styles.summaryPercent}>{formatNumber(totalPercent, 0)}{t.percent_unit}</span>
                <span className={styles.summaryGram}>{formatNumber(totalOilAmount, 0)} {t.gram_unit}</span>
            </div>
        </div>
    );
};