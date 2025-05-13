import { colors, common, smartInput } from "@/shared/styles/layout";

const themeLight = {
    unitText: colors.light.unitText,
    labelText: colors.light.labelText,
    input: smartInput.light,
};

const themeDark = {
    unitText: colors.dark.unitText,
    labelText: colors.dark.labelText,
    input: smartInput.dark,

};

const createLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        wrapper: "flex flex-col md:flex-row gap-4 relative",
        lyeTypeBlock: `flex flex-col gap-1`,
        inputLyeBlock: "flex flex-wrap gap-4",
        label: `${common.labelText}`,
        hint: "absolute right-3 top-3",

        fieldInner: "flex items-center gap-1",
        input: `w-full max-w-[100px] min-w-[90px] text-base xs:text-sm ${common.inputText}`,

    },
    theme: {
        label: theme.labelText,
        unitText: theme.unitText,
        input: theme.input
    },
});

export const leySetupStyles = {
    light: createLayoutTheme(themeLight),
    dark: createLayoutTheme(themeDark),
};
