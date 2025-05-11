import { colors, common, smartInput } from "@/shared/styles/layout";

const themeLight = {
    border: colors.light.border,
    unitText: colors.light.unitText,
    buttonText: colors.light.radioText,
    buttonBg: colors.light.radioBg,
    buttonHover: colors.light.radioHover,
    buttonActiveBg: colors.light.radioActiveBg,
    buttonActiveText: colors.light.radioActiveText,
    labelText: colors.light.labelText,
    input: smartInput.light
};

const themeDark = {
    border: colors.dark?.border,
    unitText: colors.dark?.unitText,
    buttonText: colors.dark.radioText,
    buttonBg: colors.dark.radioBg,
    buttonHover: colors.dark.radioHover,
    buttonActiveBg: colors.dark.radioActiveBg,
    buttonActiveText: colors.dark.radioActiveText,
    labelText: colors.dark.labelText,
    input: smartInput.dark
};

const createLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        wrapper: "",
        lyeTypeRow: `${common.flexColumn} flex-row gap-1`,
        buttonGroup: `flex overflow-hidden w-fit ${theme.border} ${common.borderRadius}`,
        paramRow: "flex gap-2 items-center",
        fieldWrapper: `${common.flexColumn} min-w-[140px]`,
        fieldInner: "flex items-center gap-1",
        input: `w-full max-w-[100px] text-base xs:text-sm`,
        label: common.labelText
    },
    theme: {
        label: theme.labelText,
        buttonBase: `px-4 py-1 ${common.textSm} ${common.transition} h-full`,
        buttonActive: `${theme.buttonActiveBg} ${theme.buttonActiveText}`,
        buttonInactive: `${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover}`,
        unitText: theme.unitText,
        input: theme.input
    },
});

// === Экспорт стилей Layout ===
export const lyeWaterSuperfatSetupStyles = {
    light: createLayoutTheme(themeLight),
    dark: createLayoutTheme(themeDark),
};
