import React, { FC } from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {explanationPageStyles} from "../styles/Explanation.styles";

export const WaterExplanation: FC = () => {
    const { appTheme } = useTheme();
    const styles = explanationPageStyles[appTheme];

    return (
        <div>
            <h3 className={styles.sectionTitle}>Как считаем воду</h3>
            <p>Вода нужна, чтобы растворить щёлочь и обеспечить нормальную реакцию омыления.</p>
            <p className="mt-2">
                Мы рассчитываем воду как <strong>процент от общей массы масел</strong>. По умолчанию используется 33%,
                но вы можете задать любое значение.
            </p>
            <p className="mt-2">
                Например: <br />
                <code>500 г масел × 0.33 = 165 г воды</code>
            </p>
        </div>
    );
};
