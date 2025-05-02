import {formatNumber} from "../../../shared/lib/utils";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import React, {FC} from "react";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {clsx} from "clsx";

export interface ParametersListProps {
    superfatPercent: number;
    waterPercent: number;
    lyeType: string;
    totalLyeAmount: number;
    totalWaterAmount: number;
}

export const ParametersList: FC<ParametersListProps> = (
    {
        superfatPercent,
        waterPercent,
        lyeType,
        totalLyeAmount,
        totalWaterAmount
    }) => {

    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const t = localization.ru.parameters;

    const items = [
        {label: t.superfat, percent: Math.round(superfatPercent), gram: "—"},
        {label: t.water, percent: Math.round(waterPercent), gram: formatNumber(totalWaterAmount)},
        {label: lyeType, percent: "—", gram: formatNumber(totalLyeAmount)}
    ];

    const getRowClass = (index: number) => `${styles.rowBase} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.paramsTitle}>
                Состав
            </h4>
            <div className={styles.paramHeader}>
                <span className={clsx(styles.paramHeaderText, "text-center")}></span>
                <span className={styles.paramHeaderText}> %</span>
                <span className={styles.paramHeaderText}> г</span>
            </div>
            <h4 className={styles.title}>{t.title}</h4>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={getRowClass(index)}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.percent}>
                            {item.percent !== "—" ? `${item.percent}${t.percentUnit}` : "—"}
                        </span>
                        <span className={styles.gram}>
                            {item.label === t.water || item.label === lyeType ? (
                                <span className={styles.pill}>{item.gram} {t.gramUnit}</span>
                            ) : (
                                <>
                                    {item.gram} {item.gram !== "—" ? t.gramUnit : ""}
                                </>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
