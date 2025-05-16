import { colors, common  } from "@/shared/styles/layout";

const themeLight = {
    buttonText: colors.light.radioText,
    buttonBg: colors.light.radioBg,
    buttonHover: colors.light.radioHover,
    buttonActiveBg: `bg-${colors.light.accentColor}`,
    buttonActiveText: colors.light.radioActiveText,
    // buttonActiveBorder: `border-indigo-500`
    buttonActiveBorder: `border-${colors.light.accentColor}`
};

const themeDark = {
    buttonText: colors.dark.radioText,
    buttonBg: colors.dark.radioBg,
    buttonHover: colors.dark.radioHover,
    buttonActiveBg: `bg-${colors.dark.accentColor}`,
    buttonActiveText: colors.dark.radioActiveText,
    // buttonActiveBorder: `border-emerald-400`
    buttonActiveBorder: `border-${colors.dark.accentColor}`


};

const createLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        buttonBase: `px-4 py-1 ${common.textSm} ${common.transition}
        border-t-2 border-b-2 border-l border-r flex-shrink-0 transition-colors`,
    },
    theme: {
        buttonActive: `${theme.buttonActiveBg} ${theme.buttonActiveText} ${theme.buttonActiveBorder}`,
        buttonInactive: `${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover}`,
    },
});

// === Экспорт стилей Layout ===
export const toggleButtonGroupStyles = {
    light: createLayoutTheme(themeLight),
    dark: createLayoutTheme(themeDark),
};
