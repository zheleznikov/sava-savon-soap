import { colors, common, smartInput } from "@/shared/styles/layout";

const layout = {
    // block: `${common.borderRadius} p-3 sm:p-4 relative text-sm sm:text-base mb-2`,
    block: `${common.borderRadius} relative text-sm sm:text-base sm:mb-2 mb-4`,
    topRow: "flex justify-between items-start mb-3",
    name: `font-semibold truncate flex items-center gap-1`,
    deleteButton: `absolute top-1/3 right-2 -translate-y-1/2 ${common.transition}`,
    // bottomRow: "flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-6 mb-1",
    bottomRow: "flex flex-wrap gap-2 sm:gap-4 items-center mb-2",
    inputWrapper: "flex items-center gap-1",
    input: `w-24 sm:w-28 border px-2 py-1 placeholder:text-xs placeholder:text-gray-400 text-base xs:text-sm`,
    details: "mt-2 text-xs leading-snug rounded-md p-1",
    // details: "absolute left-0 right-0 bottom-full mb-2 text-xs leading-snug rounded-md p-3 z-10",
    expandWrapper: "ml-auto pr-1 self-start xs:self-center",
    expandButton: "flex items-center gap-1 text-sm",
    blockInner: "relative p-3 sm:p-4 pb-10",
    hr: "border-t border-gray-200",
    sectionTitle: "font-semibold text-[13px] mb-1 text-left ml-2",
    ul: "list-disc pl-4 text-xs grid grid-cols-2 gap-x-4 gap-y-1",
    sectionSpacing: "my-2",


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
    expandLabel: "text-gray-500 hover:text-gray-700",


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
    expandLabel: "text-gray-500 hover:text-gray-700 text-sm",



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
        expandButton: "absolute bottom-0 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition",
        details: theme.details,
        valueNumber: theme.valueNumber,
        expandLabel: theme.expandLabel


    },
});

export const oilAddedLineStyles = {
    light: createOilAddedLineStyles(themeLight),
    dark: createOilAddedLineStyles(themeDark),
};
