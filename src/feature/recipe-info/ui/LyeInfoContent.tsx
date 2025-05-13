import {FC} from "react";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {calculateLyeForOil, calculateLyeSum, getOilSAP} from "../../recipe-calculation";
import {TOil} from "../../../entities/oil/model/oil.types";
import {formatNumber} from "../../../shared/lib/utils";
import {useTheme} from "../../../app/providers/ThemeContext";
import {infoContentStyles} from "../styles/InfoContent.styles";
import {localization} from "../../../shared/config/localization";

type Props = {
    selectedOils: TOil[];
    superfatPercent: number;
    lyeType: LyeType;
};

export const LyeInfoContent: FC<Props> = ({selectedOils, superfatPercent, lyeType}) => {
    const superfatMultiplier = 1 - superfatPercent / 100;

    const lyeRows = selectedOils.map(oil => {
        const sap = getOilSAP(oil, lyeType);
        const lye = calculateLyeForOil(oil, lyeType, superfatPercent, 0, 0, 0, 0);
        return {
            name: oil.name_rus,
            gram: oil.gram,
            sap,
            superfatMultiplier,
            lye
        };
    });

    const totalLye = calculateLyeSum({selectedOils, lyeType, superfatPercent});
    const lyeLabel = lyeType === LyeType.NaOH ? "NaOH" : "KOH";

    const {appTheme} = useTheme();
    const styles = infoContentStyles[appTheme];

    const t = localization.ru.lye_info;

    return (
        <div className={styles.wrapper}>
            <p>
                {t.explanation}
                <br/>
                <code className={styles.code}>
                    {t.formula_code}
                </code>
            </p>

            <div className="overflow-x-auto">
                <table className={styles.table}>

                    <tbody>
                    {lyeRows.map((row, index) => (
                        <tr key={index} className={styles.tbodyRow}>
                            <td className={styles.nameCell}>{lyeType} ({row.name.toLowerCase()})</td>
                            <td colSpan={7}>
                                <div className={styles.formulaWrapper}>
                                    <span
                                        className={styles.cellValue}>{formatNumber(row.gram, 0)}</span>
                                    <span className={styles.operator}>×</span>
                                    <span
                                        className={styles.cellValue}>{formatNumber(row.sap, 3)}</span>
                                    <span className={styles.operator}>×</span>
                                    <span
                                        className={styles.cellValue}>{formatNumber(row.superfatMultiplier, 2)}</span>
                                    <span className={styles.operator}>=</span>
                                    <span
                                        className={styles.resultValue}>{formatNumber(row.lye, 2)} г</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                    <tfoot>
                    <tr className={styles.tfootRow}>
                        {t.total_label.replace("{lyeType}", lyeLabel)}
                        <td colSpan={7}>
                            <span className={styles.totalValue}>{formatNumber(totalLye, 2)} г</span>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
