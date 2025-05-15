import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {useTheme} from "../../app/providers/ThemeContext";
import {toggleButtonGroupStyles} from "../styles/ToggleButtonGroup.styles";

interface ToggleOption<T> {
    label: string;
    value: T;
}

interface ToggleButtonGroupProps<T> {
    options: ToggleOption<T>[];
    onChange: (value: T) => void;
    isActive: (value: T) => boolean;
    className?: string;
}


export function ToggleButtonGroup<T extends string | number>({
    options,
    onChange,
    isActive,
    className,
}: ToggleButtonGroupProps<T>) {
    const {appTheme} = useTheme();
    const {theme, layout} = toggleButtonGroupStyles[appTheme];

    const containerRef = useRef<HTMLDivElement>(null);
    const [isWrapped, setIsWrapped] = useState(false);

    // Проверка: поместились ли табы в одну строку
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const checkWrap = () => {
            const children = Array.from(el.children) as HTMLElement[];
            if (children.length < 2) return;

            const top = children[0].offsetTop;
            const wrapped = children.some(child => child.offsetTop > top);
            setIsWrapped(wrapped);
        };

        checkWrap();
        window.addEventListener("resize", checkWrap);
        return () => window.removeEventListener("resize", checkWrap);
    }, [options]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                "flex flex-wrap",
                isWrapped ? "gap-1" : "gap-x-0",
                className
            )}
        >
            {options.map(({label, value}, index) => {
                const isFirst = index === 0;
                const isLast = index === options.length - 1;
                const active = isActive(value);

                const prevActive = index > 0 && isActive(options[index - 1].value);
                const nextActive = index < options.length - 1 && isActive(options[index + 1].value);

                const hideLeftBorder = !isFirst && (prevActive || active);
                const hideRightBorder = !isLast && (active || (!active && nextActive));

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onChange(value)}
                        className={clsx(
                            layout.buttonBase,
                            active ? theme.buttonActive : theme.buttonInactive,
                            active && theme.buttonActiveBorder,
                            hideLeftBorder && !isWrapped && "border-l-transparent",
                            hideRightBorder && !isWrapped && "border-r-transparent",
                            isWrapped
                                ? "rounded-full m-[1px]"
                                : clsx(isFirst && "rounded-l-full", isLast && "rounded-r-full")
                        )}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
