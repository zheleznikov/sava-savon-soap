import { useState } from "react";

export const NavBar = ({ onTabChange }: { onTabChange: (tab: "calculator" | "recipes") => void }) => {
    const [activeTab, setActiveTab] = useState<"calculator" | "recipes">("calculator");

    const handleTabClick = (tab: "calculator" | "recipes") => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
            <div className="max-w-3xl mx-auto px-4 py-2 flex justify-between items-center text-sm sm:text-base">
                {["calculator", "recipes"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabClick(tab as "calculator" | "recipes")}
                        className={`px-4 py-1 rounded-md transition font-medium ${
                            activeTab === tab
                                ? "text-emerald-600 bg-emerald-100"
                                : "text-gray-700 hover:text-emerald-600"
                        }`}
                    >
                        {tab === "calculator" ? "Калькулятор" : "Рецепты"}
                    </button>
                ))}
            </div>
        </nav>
    );
};
