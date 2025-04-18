import {FC, useState, useEffect} from "react";

interface SmartNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    disabled?: boolean
}

export const SmartNumberInput: FC<SmartNumberInputProps> = ({
                                                                value,
                                                                onChange,
                                                                className = '',
                                                                placeholder = '',
                                                                min,
                                                                max,
                                                                disabled = false
                                                            }) => {
    const [internalValue, setInternalValue] = useState(value === 0 ? '' : value.toString());

    useEffect(() => {
        // Обновляем внутреннее значение при внешнем обновлении
        setInternalValue(value === 0 ? '' : value.toString());
    }, [value]);

    const handleBlur = () => {
        if (internalValue === '') {
            onChange(0);
            setInternalValue('');
        } else {
            const numericValue = parseFloat(internalValue);
            if (!isNaN(numericValue)) {
                onChange(numericValue);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);

        const numeric = parseFloat(newValue);
        if (!isNaN(numeric)) {
            onChange(numeric); // <<< вот это — ключевое изменение
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
        />
    );
};
