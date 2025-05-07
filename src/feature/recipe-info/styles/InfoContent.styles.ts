const createLyeTheme = (theme: typeof themeLight | typeof themeDark) => ({
    wrapper: `space-y-4 text-sm leading-relaxed`,
    code: `px-1 py-0.5 rounded ${theme.codeBg}`,

    table: "min-w-full text-left text-xs border-separate border-spacing-y-1",
    theadRow: `${theme.text}`,
    tbodyRow: `${theme.text}`,
    tfootRow: `${theme.text} ${theme.totalFont}`,

    nameCell: "pr-2",
    totalLabelCell: "pr-2",
    totalValue: "inline-block min-w-[36px] text-center font-semibold",

    formulaWrapper: "inline-flex items-center gap-1 flex-wrap",
    cellValue: "inline-block min-w-[36px] text-center",
    operator: `inline-block mx-1 ${theme.operatorColor}`,
    resultValue: "inline-block min-w-[36px] text-center font-semibold",

    closeButton: theme.closeButton,
});


const themeLight = {
    text: "text-gray-700",
    codeBg: "bg-gray-100",
    totalFont: "font-semibold text-gray-800",
    wrapperBg: "bg-white",
    operatorColor: "text-gray-500",
    closeButton: "text-gray-600 hover:text-black",
}

const themeDark = {
    text: "text-gray-200",
    codeBg: "bg-zinc-800",
    totalFont: "font-semibold text-gray-100",
    wrapperBg: "bg-zinc-900", // был bg-gray-800 — стал темнее
    operatorColor: "text-gray-300", // улучшенная видимость
    closeButton: "text-gray-300 hover:text-white", // для иконки закрытия
};


export const infoContentStyles = {
    light: createLyeTheme(themeLight),
    dark: createLyeTheme(themeDark),
};
