import { FC, useState, useEffect } from "react";

interface SmartNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
    decimalPlaces?: number; // 👈 добавили параметр
}

export const SmartNumberInput: FC<SmartNumberInputProps> = ({
                                                                value,
                                                                onChange,
                                                                className = '',
                                                                placeholder = '',
                                                                min,
                                                                max,
                                                                disabled = false,
                                                                decimalPlaces = 2 // 👈 по умолчанию 2 знака
                                                            }) => {
    const format = (v: number) => v.toFixed(decimalPlaces);

    const [internalValue, setInternalValue] = useState(value === 0 ? '' : format(value));

    useEffect(() => {
        setInternalValue(value === 0 ? '' : format(value));
    }, [value, decimalPlaces]);

    const handleBlur = () => {
        if (internalValue === '') {
            onChange(0);
            setInternalValue('');
        } else {
            const numericValue = parseFloat(internalValue);
            if (!isNaN(numericValue)) {
                const rounded = parseFloat(numericValue.toFixed(decimalPlaces));
                onChange(rounded);
                setInternalValue(format(rounded));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Регулярка: максимум decimalPlaces знаков после точки
        const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
        if (regex.test(raw)) {
            setInternalValue(raw);

            const numeric = parseFloat(raw);
            if (!isNaN(numeric)) {
                onChange(numeric);
            }
        }
    };

    return (
        <input
            type="number"
            value={internalValue}
            onChange={handleChange}
            onFocus={(e) => {
                if (value === 0) {
                    e.target.select();
                }
            }}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={min}
            max={max}
            className={`border rounded px-2 py-1 ${className}`}
            disabled={disabled}
            inputMode="decimal"
        />
    );
};
