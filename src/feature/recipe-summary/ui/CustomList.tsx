import {formatNumber} from "../../../shared/lib/utils";
import {FC} from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {TCustom} from "../../../entities/oil/model/custom.types";


interface Props {
    selectedCustoms: TCustom[];
    totalCustomAmount: number;
}

export const CustomList: FC<Props> = ({selectedCustoms, totalCustomAmount}) => {

    const t = localization.ru.custom_list;

    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const getRowClass = (index: number) => `${styles.rowBase} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t.title}</h4>

            <ul className={styles.list}>
                {selectedCustoms.map((custom, index) => (
                    <li key={custom.id} className={getRowClass(index)}>
                        <span className={styles.name}>{custom.name_rus}</span>
                        <span className={styles.percent}>{formatNumber(custom.percent, 0)}{t.percent_unit}</span>
                        <span className={styles.gram}>{formatNumber(custom.gram, 0)} {t.gram_unit}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.summary}>
                <span className={styles.summaryLabel}>{t.summary_label}</span>
                <span className={styles.summaryPercent}>—</span>
                <span className={styles.summaryGram}>{formatNumber(totalCustomAmount, 0)} {t.gram_unit}</span>
            </div>
        </div>
    );
};
