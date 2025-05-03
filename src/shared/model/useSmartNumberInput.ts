import React, {useState, useEffect} from "react";

interface UseSmartNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    decimalPlaces: number;
}

export const useSmartNumberInput = (
    {
        value,
        onChange,
        decimalPlaces,
    }: UseSmartNumberInputProps) => {
    const format = (v: number) => v.toFixed(decimalPlaces);

    const [internalValue, setInternalValue] = useState(value === 0 ? '' : format(value));

    useEffect(() => {
        setInternalValue(value === 0 ? '' : format(value));
    }, [value, decimalPlaces]);


    const handlers = {
        change: (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);

            if (regex.test(raw)) {
                setInternalValue(raw);
                const numeric = parseFloat(raw);
                if (!isNaN(numeric)) {
                    onChange(numeric);
                }
            }
        },

        blur: () => {
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
        },

        focus: (e: React.FocusEvent<HTMLInputElement>) => {
            if (value === 0) {
                e.target.select();
            }
        }
    };

    return {internalValue, handlers};
};
