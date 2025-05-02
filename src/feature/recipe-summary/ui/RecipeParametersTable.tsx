import {FC} from "react";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {formatNumber} from "@/shared/lib/utils";
import {isInRange} from "../utils/utils";
import {useTheme} from "../../../app/providers/ThemeContext";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {localization} from "../../../shared/config/localization";

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

    const parameters = [
        {label: t.hardness, value: hardness, range: "29–54", digits: 1},
        {label: t.cleansing, value: cleansing, range: "12–22", digits: 1},
        {label: t.softening, value: soften, range: "44–69", digits: 1},
        {label: t.creaminess, value: creaminess, range: "16–48", digits: 1},
        {label: t.bubbling, value: bubbling, range: "14–46", digits: 1},
        {label: t.iodine, value: iodine, range: "41–70", digits: 1},
    ].map((param) => {
        const numeric = !isNaN(param.value) ? param.value : null;
        return {
            ...param,
            formatted: numeric !== null ? formatNumber(numeric, param.digits) : "—",
            inRange: numeric !== null ? isInRange(numeric, param.range) : null,
        };
    });

    return (
        <InputBlockWrapper className="lg:w-1/2 px-0">
            <h4 className={styles.title}>{t.title}</h4>

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
