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

    return (
        <div className={className}>
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
                            hideLeftBorder && "border-l-transparent",
                            hideRightBorder && "border-r-transparent",
                            isFirst && "rounded-l-full",
                            isLast && "rounded-r-full"
                        )}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
