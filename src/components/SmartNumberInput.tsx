import { FC, useState, useEffect } from "react";

interface SmartNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    placeholder?: string;
    min?: number;
    max?: number;
}

export const SmartNumberInput: FC<SmartNumberInputProps> = ({
                                                                value,
                                                                onChange,
                                                                className = '',
                                                                placeholder = '',
                                                                min,
                                                                max,
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

    return (
        <input
            type="number"
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
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
        />
    );
};
