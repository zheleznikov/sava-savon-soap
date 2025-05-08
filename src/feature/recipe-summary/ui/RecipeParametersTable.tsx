import {FC} from "react";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {useTheme} from "../../../app/providers/ThemeContext";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {localization} from "../../../shared/config/localization";
import {getRecipeParameters} from "../../../shared/lib/recipeParameters";

export interface RecipeParametersTableProps {
    hardness: number;
    cleansing: number;
    soften: number;
    bubbling: number;
    creaminess: number;
    iodine: number;
}

export const RecipeParametersTable: FC<RecipeParametersTableProps> = (
    {
        hardness,
        cleansing,
        soften,
        bubbling,
        creaminess,
        iodine,
    }) => {
    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const t = localization.ru.parameters_table;

    const parameters = getRecipeParameters({hardness, cleansing, soften, bubbling, creaminess, iodine});

    return (
        <InputBlockWrapper className="px-0 w-full">
            <h4 className={styles.paramsTitle}>{t.title}</h4>

            <div className={styles.paramHeader}>
                <span className={styles.paramHeaderText}>{t.param}</span>
                <span className={`${styles.paramHeaderText} ${styles.paramValueHeader}`}>{t.value}</span>
                <span className={`${styles.paramHeaderText} ${styles.paramRangeHeader}`}>{t.range}</span>
            </div>


            <ul className={styles.list}>
                {parameters.map((param, index) => (
                    <li key={index} className={styles.getRowClass(index)}>
                        <span className={styles.name}>{param.label}</span>

                        <span className={styles.paramValue}>
                            {param.inRange !== null && (
                                <span
                                    className={`${styles.statusDot} ${param.inRange ? styles.dotOk : styles.dotBad}`}
                                />
                            )}
                            {param.formatted}
                        </span>

                        <span className={styles.paramRange}>{param.range}</span>
                    </li>
                ))}
            </ul>
        </InputBlockWrapper>
    );
};
