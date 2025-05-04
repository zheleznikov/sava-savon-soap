import React, { FC } from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {explanationPageStyles} from "../styles/Explanation.styles";
import {localization} from "../../../shared/config/localization";


export const LyeExplanation: FC = () => {
    const { appTheme } = useTheme();
    const styles = explanationPageStyles[appTheme];
    const t = localization.ru.explanation.lye;

    return (
        <div>
            <h3 className={styles.sectionTitle}>Как считаем щёлочь</h3>
            <p>Чтобы мыло получилось, щёлочь должна реагировать с маслами. Но не с каждым маслом одинаково.</p>
            <p className="mt-2">
                У каждого масла есть своё <strong>SAP-значение</strong> (коэффициент омыления) — это число показывает, сколько грамм щёлочи нужно
                на 1 грамм этого масла.
            </p>

            <p className="mt-4 font-semibold">Пример расчёта щёлочи:</p>
            <p className="mt-2">Допустим, у нас есть рецепт:</p>
            <ul className={styles.list}>
                <li>200 г оливкового масла (SAP ≈ 0.134)</li>
                <li>100 г кокосового масла (SAP ≈ 0.183)</li>
            </ul>

            <p className="mt-2">Считаем щёлочь для каждого масла:</p>
            <ul className={styles.list}>
                <li>Оливковое: 200 × 0.134 = <strong>26.8 г NaOH</strong></li>
                <li>Кокосовое: 100 × 0.183 = <strong>18.3 г NaOH</strong></li>
            </ul>

            <p className="mt-2">Всего: 26.8 + 18.3 = <strong>45.1 г NaOH</strong> — без пережира.</p>

            <p className="mt-2">
                Затем учитываем <strong>пережир</strong> — это «страховка», чтобы не вся щёлочь среагировала, и в мыле
                остались неомылившиеся масла.
            </p>

            <p className="mt-2">
                Например, если пережир указан 5%, то щёлочь уменьшится на 5%.<br />
                В нашем примере 45.1 г NaOH без пережира, значит:
            </p>
            <p className="mt-1">
                <strong>Общее количество щёлочи = 45.1 × 95% = 42.8 г NaOH.</strong>
            </p>
        </div>
    );
};
