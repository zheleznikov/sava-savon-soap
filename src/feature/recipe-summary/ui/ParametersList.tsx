import {formatNumber} from "../../../shared/lib/utils";
import {useTheme} from "../../../app/providers/ThemeContext";
import {localization} from "../../../shared/config/localization";
import React, {FC, useState} from "react";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {clsx} from "clsx";
import {InfoPopup} from "../../../shared/ui/InfoPopup";
import {TOil} from "../../../entities/oil/model/oil.types";
import {LyeInfoContent} from "../../recipe-info/ui/LyeInfoContent";
import {
    LyeType,
    MeasureInputType,
    measureInputTypeMeta
} from "../../../app/providers/SoapRecipeContext.types";
import {Hint} from "../../../shared/ui/Hint";

export interface ParametersListProps {
    superfatPercent: number;
    waterPercent: number;
    lyeType: LyeType;
    totalLyeAmount: number;
    totalNaOHAmount?: number;
    totalKOHAmount?: number;
    totalWaterAmount: number;
    selectedOils: TOil [];
    measureInput: MeasureInputType
}

export const ParametersList: FC<ParametersListProps> = (
    {
        superfatPercent,
        waterPercent,
        lyeType,
        totalLyeAmount,

        totalWaterAmount,
        selectedOils,
        totalNaOHAmount,
        totalKOHAmount,
        measureInput
    }) => {

    const t = localization.ru.parameters;


    const items = lyeType === LyeType.Mixed
        ? [
            { label: t.superfat, percent: Math.round(superfatPercent), gram: "—" },
            { label: t.water, percent: Math.round(waterPercent), gram: formatNumber(totalWaterAmount) },
            { label: "NaOH", percent: "—", gram: formatNumber(totalNaOHAmount || 0) },
            { label: "KOH", percent: "—", gram: formatNumber(totalKOHAmount || 0) },
        ]
        : [
            { label: t.superfat, percent: Math.round(superfatPercent), gram: "—" },
            { label: t.water, percent: Math.round(waterPercent), gram: formatNumber(totalWaterAmount) },
            { label: lyeType, percent: "—", gram: formatNumber(totalLyeAmount) },
        ];

    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme];

    const [isPopupOpen, setIsPopupOpen] = useState(false);



    const getRowClass = (index: number) => `${styles.rowBase} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`;

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.paramsTitle}>
                Состав
            </h4>
            <div className={styles.paramHeader}>
                <span className={clsx(styles.paramHeaderText, "text-center")}></span>
                <span className={styles.paramHeaderText}> %</span>
                <span className={styles.paramHeaderText}>{` ${measureInputTypeMeta[measureInput].ru.short}`}</span>
            </div>
            <h4 className={styles.title}>{t.title}</h4>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index} className={getRowClass(index)}>
                       <span className={styles.label}>{item.label}
                           {/*{(item.label === lyeType) && (*/}

                           {/*    <Hint*/}
                           {/*        className="ml-2 group relative align-middle"*/}
                           {/*        onClick={() => setIsPopupOpen(true)}*/}
                           {/*    />*/}
                           {/*)}*/}
                       </span>


                        <span className={styles.percent}>
                            {item.percent !== "—" ? `${item.percent}${t.percentUnit}` : "—"}
                        </span>

                        <span className={styles.gram}>
                            {item.label === t.water || item.label === lyeType ? (
                                <span className={styles.pill}>{item.gram} {measureInputTypeMeta[measureInput].ru.short}</span>
                            ) : (
                                <>
                                    {item.gram} {item.gram !== "—" ? measureInputTypeMeta[measureInput].ru.short : ""}
                                </>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
            {
                <InfoPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <LyeInfoContent selectedOils={selectedOils} superfatPercent={superfatPercent}
                                    lyeType={lyeType}/>
                </InfoPopup>

            }
        </div>
    );
};
