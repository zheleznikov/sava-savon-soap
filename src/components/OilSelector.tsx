import React, { useState } from "react";
import { oils as allOils, Oil } from "../data/oils";
import { OilAutocomplete } from "./OilAutocomplete";

type SelectedOil = {
    oil: Oil;
    percent: number;
    weight: number;
};

const OilSelector: React.FC = () => {
    const [selectedOils, setSelectedOils] = useState<SelectedOil[]>([]);

    const [currentOil, setCurrentOil] = useState<Oil | null>(null);
    const [currentPercent, setCurrentPercent] = useState<number>(0);
    const [currentWeight, setCurrentWeight] = useState<number>(0);

    const handleAdd = () => {
        if (!currentOil) return;

        const alreadyExists = selectedOils.some(
            (entry) => entry.oil.name === currentOil.name
        );

        if (alreadyExists) {
            alert("Это масло уже добавлено!");
            return;
        }

        setSelectedOils((prev) => [
            ...prev,
            {
                oil: currentOil,
                percent: currentPercent,
                weight: currentWeight,
            },
        ]);

        // Сбросим текущие поля
        setCurrentOil(null);
        setCurrentPercent(0);
        setCurrentWeight(0);
    };

    const handleRemove = (index: number) => {
        setSelectedOils((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            {/* Ввод новой строки */}
            <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="flex-1">
                    <OilAutocomplete value={currentOil} onChange={setCurrentOil} />
                </div>

                <input
                    type="number"
                    placeholder="%"
                    className="w-20 border rounded px-2 py-1"
                    value={currentPercent}
                    onChange={(e) => setCurrentPercent(Number(e.target.value))}
                />

                <input
                    type="number"
                    placeholder="г"
                    className="w-20 border rounded px-2 py-1"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(Number(e.target.value))}
                />

                <button
                    onClick={handleAdd}
                    className="px-4 py-1 rounded bg-purple-500 text-white hover:bg-purple-600"
                >
                    Добавить масло
                </button>
            </div>

            {/* Список выбранных масел */}
            <div className="flex flex-col gap-2">
                {selectedOils.map((entry, index) => (
                    <div
                        key={entry.oil.name}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <span className="font-medium">{entry.oil.name}</span>
                            <span>{entry.percent}%</span>
                            <span>{entry.weight} г</span>
                        </div>
                        <button
                            onClick={() => handleRemove(index)}
                            className="text-red-500 hover:text-red-700"
                            title="Удалить"
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OilSelector;
