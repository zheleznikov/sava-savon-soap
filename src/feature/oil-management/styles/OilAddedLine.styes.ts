import { colors, common, smartInput } from "@/shared/styles/layout";

const layout = {
    block: `${common.borderRadius} p-3 sm:p-4 relative text-sm sm:text-base mb-2`,
    topRow: "flex justify-between items-start mb-3",
    name: `font-semibold truncate flex items-center gap-1`,
    deleteButton: `absolute top-9 right-3 -translate-y-1/2 ${common.transition}`,
    bottomRow: "flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6",
    inputWrapper: "flex items-center gap-1",
    input: `w-24 sm:w-28 border px-2 py-1 placeholder:text-xs placeholder:text-gray-400`,
    details: "mt-2 text-xs leading-snug rounded-md p-1",
    expandWrapper: "ml-auto pr-1 self-start xs:self-center",
    // details: "mt-2 text-xs leading-snug rounded-md p-1 overflow-hidden transition-all duration-100 ease-in-out", // базовые стили
    // detailsVisible: "max-h-[1000px] opacity-100 scale-100",              // видно
    // detailsHidden: "max-h-0 opacity-0 scale-95",

};

const themeLight = {
    container: `${colors.light.border} bg-white/70 ${common.blur} ${common.shadowSm}`,
    title: colors.light.text,
    unitText: colors.light.unitText,
    deleteButton: "text-gray-400 md:hover:text-red-500",
    input: smartInput.light,
    inputDisabled: colors.light.inputDisabled + " border-gray-200",
    details: "text-gray-600",
    valueNumber: "font-mono font-bold text-indigo-600", // можно настроить цвет под палитру

};

const themeDark = {
    container: `${colors.dark.border} border ${colors.dark.bg} ${common.blur} ${common.shadowSm}`,
    title: colors.dark.text,
    unitText: colors.dark.unitText,
    deleteButton: "text-gray-500 md:hover:text-red-400",
    input: smartInput.dark,
    inputDisabled: colors.dark.inputDisabled + " border-gray-700",
    details: "text-white",
    valueNumber: "font-mono font-bold text-emerald-400", // можно настроить цвет под палитру


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
        expandButton: "absolute bottom-2 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition",
        details: theme.details,
        valueNumber: theme.valueNumber


    },
});

export const oilAddedLineStyles = {
    light: createOilAddedLineStyles(themeLight),
    dark: createOilAddedLineStyles(themeDark),
};
