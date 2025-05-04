import React, { FC } from "react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {explanationPageStyles} from "../styles/Explanation.styles";
import {localization} from "../../../shared/config/localization";

export const PropertiesExplanation: FC = () => {
    const { appTheme } = useTheme();
    const styles = explanationPageStyles[appTheme];

    const t = localization.ru.explanation.properties;


    return (
        <div>
            <h3 className={styles.sectionTitle}>Как считаем свойства мыла</h3>
            <p>
                Для каждого масла известно, какие жирные кислоты в нём содержатся и в каком количестве. Мы используем эти
                данные, чтобы рассчитать вклад каждого масла в свойства мыла.
            </p>
            <p className="mt-2">Когда вы составляете рецепт, мы:</p>
            <ul className={styles.list}>
                <li>определяем долю каждого масла,</li>
                <li>считаем, какие жирные кислоты оно вносит в рецепт,</li>
                <li>вычисляем <strong>взвешенное среднее содержание кислот</strong>,</li>
                <li>на основе этого рассчитываем свойства мыла.</li>
            </ul>

            <h4 className="font-semibold mt-4">Пример:</h4>
            <p className="mt-1">
                Если в рецепте 70% оливкового масла (~10% пальмитиновой кислоты) и 30% кокосового масла (~9%), то среднее
                содержание пальмитиновой:
            </p>
            <p><code>70 × 10% + 30 × 9% = 9.7%</code></p>

            <h4 className="font-semibold mt-6 mb-2">Что означают свойства и как они считаются:</h4>
            <ul className={styles.list}>
                <li><strong>Hardness (твёрдость):</strong> пальмитиновая + стеариновая → прочность мыла</li>
                <li><strong>Cleansing (очищение):</strong> лауриновая + миристиновая → моющая сила, может сушить</li>
                <li><strong>Conditioning (смягчение):</strong> олеиновая, линолевая, линоленовая → уход</li>
                <li><strong>Bubbling (пена):</strong> лауриновая, миристиновая, рицинолевая → воздушная пена</li>
                <li><strong>Creaminess (кремовость):</strong> стеариновая, пальмитиновая, рицинолевая → плотная пена</li>
                <li><strong>Iodine:</strong> ненасыщенные жирные кислоты → мягкость и срок хранения</li>
            </ul>

            <h4 className="font-semibold mt-6 mb-2">Рекомендуемые диапазоны</h4>
            <p className="mb-2">
                Ниже — ориентировочные значения, которые считаются сбалансированными. Это не жёсткие правила, а подсказка.
            </p>

            <div className="overflow-x-auto">
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.tableHead}>
                        <th className={styles.tableCell}>Свойство</th>
                        <th className={styles.tableCell}>Диапазон</th>
                        <th className={styles.tableCell}>Почему</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={styles.tableCell}>Hardness</td>
                        <td className={styles.tableCell}>29–54</td>
                        <td className={styles.tableCell}>Низкое — мыло мягкое, высокое — крошится</td>
                    </tr>
                    <tr>
                        <td className={styles.tableCell}>Cleansing</td>
                        <td className={styles.tableCell}>12–22</td>
                        <td className={styles.tableCell}>Выше — сушит кожу, ниже — плохо отмывает</td>
                    </tr>
                    <tr>
                        <td className={styles.tableCell}>Conditioning</td>
                        <td className={styles.tableCell}>44–69</td>
                        <td className={styles.tableCell}>Смягчение и уход за кожей</td>
                    </tr>
                    <tr>
                        <td className={styles.tableCell}>Bubbling</td>
                        <td className={styles.tableCell}>14–46</td>
                        <td className={styles.tableCell}>Воздушная пена</td>
                    </tr>
                    <tr>
                        <td className={styles.tableCell}>Creaminess</td>
                        <td className={styles.tableCell}>16–48</td>
                        <td className={styles.tableCell}>Плотная кремовая пена</td>
                    </tr>
                    <tr>
                        <td className={styles.tableCell}>Iodine</td>
                        <td className={styles.tableCell}>41–70</td>
                        <td className={styles.tableCell}>Высокое — мягкость, но короче срок хранения</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
