import { colors, common } from "@/shared/styles/layout";

// === Базовые переменные light ===
const themeLight = {
    border: colors.light.border,
    unitText: colors.light.unitText,
    buttonText: colors.light.radioText,
    buttonBg: colors.light.radioBg,
    buttonHover: colors.light.radioHover,
    buttonActiveBg: colors.light.radioActiveBg,
    buttonActiveText: colors.light.radioActiveText,
    labelText: common.labelText,
};

// === Базовые переменные dark ===
const themeDark = {
    border: colors.dark?.border || "border-gray-700", // если пока нет — заготовка
    unitText: colors.dark?.unitText || "text-gray-400",
    buttonText: colors.dark.radioText,
    buttonBg: colors.dark.radioBg,
    buttonHover: colors.dark.radioHover,
    buttonActiveBg: colors.dark.radioActiveBg,
    buttonActiveText: colors.dark.radioActiveText,
    labelText: common.labelText,
};

// === Функция для создания темы Layout/Calculator ===
const createLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        wrapper: "space-y-4",
        lyeTypeRow: `${common.flexColumn} flex-row gap-1`,
        buttonGroup: `flex overflow-hidden w-fit ${theme.border} ${common.borderRadius}`,
        paramRow: "flex flex-wrap gap-4 sm:items-center",
        fieldWrapper: `${common.flexColumn} min-w-[140px]`,
        fieldInner: "flex items-center gap-1",
        input: `w-full max-w-[100px] ${common.textSm}`,
    },
    theme: {
        label: theme.labelText,
        buttonBase: `px-4 py-1 ${common.textSm} ${common.transition}`,
        buttonActive: `${theme.buttonActiveBg} ${theme.buttonActiveText}`,
        buttonInactive: `${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover}`,
        unitText: theme.unitText,
    },
});

// === Экспорт стилей Layout ===
export const styles = {
    light: createLayoutTheme(themeLight),
    dark: createLayoutTheme(themeDark),
};
