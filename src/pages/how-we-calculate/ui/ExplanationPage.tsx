import {useState} from "react";
import {explanationPageStyles} from "../../../feature/explanation/styles/Explanation.styles";
import {useTheme} from "../../../app/providers/ThemeContext";
import {LyeExplanation} from "../../../feature/explanation/ui/LyeExplanation";
import {WaterExplanation} from "../../../feature/explanation/ui/WaterExplanation";
import {PropertiesExplanation} from "../../../feature/explanation/ui/PropertiesExplanation";
import {ScalingExplanation} from "../../../feature/explanation/ui/ScalingExplanation";



export const ExplanationPage = () => {
    const [selectedTab, setSelectedTab] = useState<"lye" | "water" | "properties" | "scaling">("lye");
    const { appTheme } = useTheme();
    const styles = explanationPageStyles[appTheme];

    return (
        <section className={styles.container}>
            <h2 className={styles.header}>Как мы считаем</h2>

            <p className="mb-6">Мы хотим, чтобы вы понимали, как мы считаем рецепты.</p>

            <div className={styles.tabWrapper}>
                {[
                    { key: "lye", label: "Щёлочь" },
                    { key: "water", label: "Вода" },
                    { key: "properties", label: "Свойства мыла" },
                    { key: "scaling", label: "Масштабирование" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                        className={`${styles.tabButton.base} ${
                            selectedTab === tab.key ? styles.tabButton.active : styles.tabButton.inactive
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px] transition-all">
                {selectedTab === "lye" && <LyeExplanation />}
                {selectedTab === "water" && <WaterExplanation />}
                {selectedTab === "properties" && <PropertiesExplanation />}
                {selectedTab === "scaling" && <ScalingExplanation />}
            </div>
        </section>
    );
};
