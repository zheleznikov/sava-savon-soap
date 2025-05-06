import React, {FC, useRef} from "react";
import {useSmartNumberInput} from "../model/useSmartNumberInput";
import {clsx} from "clsx";

interface SmartNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
    decimalPlaces?: number;
}

export const SmartNumberInput: FC<SmartNumberInputProps> = ({
    value,
    onChange,
    className = "",
    placeholder = "",
    min,
    max,
    disabled = false,
    decimalPlaces = 0
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { internalValue, handlers } = useSmartNumberInput({
        value,
        onChange,
        decimalPlaces,
        inputRef
    });

    return (
        <input
            ref={inputRef}
            type="number"
            value={internalValue}
            onChange={handlers.change}
            onFocus={handlers.focus}
            onBlur={handlers.blur}
            onKeyDown={handlers.keyDown}
            placeholder={placeholder}
            min={min}
            max={max}
            className={clsx("border rounded px-2 py-1 text-base", className)}
            disabled={disabled}
            inputMode="decimal"
        />
    );
};
