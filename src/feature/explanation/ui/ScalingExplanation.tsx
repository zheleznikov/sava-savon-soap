import React, { FC } from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {explanationPageStyles} from "../styles/Explanation.styles";
export const ScalingExplanation: FC = () => {
    const { appTheme } = useTheme();
    const styles = explanationPageStyles[appTheme];

    return (
        <div>
            <h3 className={styles.sectionTitle}>Масштабирование рецепта</h3>
            <p>
                Это одна из ключевых возможностей калькулятора. Вы можете ввести рецепт в <strong>процентах</strong> и
                задать <strong>итоговый вес мыла</strong> — мы пересчитаем всё автоматически.
            </p>
            <p className="mt-2">
                Или у вас есть готовый рецепт, и вы хотите пересчитать его под другой вес — просто введите параметры и
                нажмите «пересчитать».
            </p>
        </div>
    );
};
