import { colors, common, smartInput } from "@/shared/styles/layout";

const layout = {
    block: `${common.borderRadius} p-3 sm:p-4 relative text-sm sm:text-base mb-2`,
    topRow: "flex justify-between items-start mb-3",
    name: `font-semibold truncate flex items-center gap-1`,
    deleteButton: `absolute top-1/2 right-3 -translate-y-1/2 ${common.transition}`,
    bottomRow: "flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6",
    inputWrapper: "flex items-center gap-1",
    input: `w-24 sm:w-28 border px-2 py-1 placeholder:text-xs placeholder:text-gray-400`,
};

const themeLight = {
    container: `${colors.light.border} bg-white/70 ${common.blur} ${common.shadowSm}`,
    title: colors.light.text,
    unitText: colors.light.unitText,
    deleteButton: "text-gray-400 md:hover:text-red-500",
    input: smartInput.light,
    inputDisabled: colors.light.inputDisabled + " border-gray-200",
};

const themeDark = {
    container: `${colors.dark.border} border ${colors.dark.bg} ${common.blur} ${common.shadowSm}`,
    title: colors.dark.text,
    unitText: colors.dark.unitText,
    deleteButton: "text-gray-500 md:hover:text-red-400",
    input: smartInput.dark,
    inputDisabled: colors.dark.inputDisabled + " border-gray-700",
};

const createOilAddedLineStyles = (theme: typeof themeLight) => ({
    layout: {
        ...layout,
    },
    theme: {
        block: `${layout.block} ${theme.container}`,
        name: `${layout.name} ${theme.title}`,
        deleteButton: `${layout.deleteButton} ${theme.deleteButton}`,
        unitText: theme.unitText,
        input: `${layout.input} ${theme.input}`,
        inputDisabled: theme.inputDisabled,
    },
});

export const oilAddedLineStyles = {
    light: createOilAddedLineStyles(themeLight),
    dark: createOilAddedLineStyles(themeDark),
};
