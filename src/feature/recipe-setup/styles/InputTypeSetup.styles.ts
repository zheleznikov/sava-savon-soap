import { colors, common } from "@/shared/styles/layout";

const themeLight = {
    border: colors.light.border,
    unitText: colors.light.unitText,
    buttonText: colors.light.radioText,
    buttonBg: colors.light.radioBg,
    buttonHover: colors.light.radioHover,
    buttonActiveBg: colors.light.radioActiveBg,
    buttonActiveText: colors.light.radioActiveText,

    labelText: colors.light.labelText,
    inputDisabled: colors.light.inputDisabled,
    input: `${colors.light.bg} ${colors.light.text}`
};

const themeDark = {
    border: colors.dark.border,
    unitText: colors.dark.unitText ,
    buttonText: colors.dark.radioText,
    buttonBg: colors.dark.radioBg,
    buttonHover: colors.dark.radioHover,
    buttonActiveBg: colors.dark.radioActiveBg,
    buttonActiveText: colors.dark.radioActiveText,
    labelText: colors.dark.labelText,
    inputDisabled: colors.light.inputDisabled,
    input: `${colors.dark.bg} ${colors.dark.text}`
};

const createLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        wrapper: "flex flex-wrap gap-6 sm:gap-8",
        fieldWrapper: common.flexColumn,
        weightRow: "flex items-center gap-1",
        buttonGroup: `flex overflow-hidden w-fit ${theme.border} ${common.borderRadius}`,
        label: common.labelText
    },
    theme: {
        label: theme.labelText,
        buttonBase: `px-4 py-1 ${common.textSm} ${common.transition}`,
        buttonActive: `${theme.buttonActiveBg} ${theme.buttonActiveText}`,
        buttonInactive: `${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover}`,
        inputBase: "w-[120px] text-sm",
        inputDisabled: theme.inputDisabled,
        hint: "text-xs mt-1 transition-opacity duration-200 min-h-[1rem]",
        hintVisible: "text-gray-400 opacity-100 visible",
        hintHidden: "opacity-0 invisible",
        unitText: theme.unitText,
        input: theme.input
    },
});

export const inputTypeSetupStyles = {
    light: createLayoutTheme(themeLight),
    dark: createLayoutTheme(themeDark),
};
