import {formatNumber} from "../../../shared/lib/utils";
import {FC} from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";

export interface ResultSummaryProps {
    totalResultAmount: number;
}

export const ResultSummary: FC<ResultSummaryProps> = ({ totalResultAmount }) => {
    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const t = localization.ru.result_summary;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t.title}</h4>
            <div className={styles.summary}>
                <span>{t.label}</span>
                <span className={styles.resultPlaceholder}>—</span>
                <span className={styles.resultTotal}>{formatNumber(totalResultAmount)} {t.unit}</span>
            </div>
        </div>
    );
};
