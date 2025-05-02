const rowBase = "grid grid-cols-3 gap-2 py-1 rounded-md px-2 items-center";
const titleBase = "text-md font-semibold mb-2 mt-1 text-center";
const wrapper = "mt-1";
const pillBase = "inline-flex items-center justify-center text-base font-medium rounded-full px-3 py-1 min-w-[40px]";

const themeLight = {
    colors: {
        title: "text-indigo-700",
        rowEven: "bg-stone-50/90",
        rowOdd: "bg-white",
        name: "text-gray-700",
        label: "text-gray-600",
        value: "text-gray-800",
        placeholder: "text-gray-400",
        pillBorder: "border-emerald-500",
        summaryBg: "bg-stone-100",
    },
    input: {
        base: "w-full text-4xl text-center font-bold min-h-[2.5rem] bg-transparent outline-none transition",
        textEmpty: "text-gray-400",
        textFilled: "text-indigo-700",
    },
};

const themeDark = {
    colors: {
        title: "text-emerald-300",
        rowEven: "bg-gray-800/70",
        rowOdd: "bg-gray-900/50",
        name: "text-gray-200",
        label: "text-gray-300",
        value: "text-gray-100",
        placeholder: "text-gray-500",
        pillBorder: "border-emerald-400",
        summaryBg: "bg-black",
    },
    input: {
        base: "w-full text-4xl text-center font-bold min-h-[2.5rem] bg-transparent outline-none transition",
        textEmpty: "text-gray-500",
        textFilled: "text-emerald-400",
    },
};

const createRecipeBlockLayout = (theme: typeof themeLight) => ({
    wrapper,
    title: `${titleBase} ${theme.colors.title}`,
    list: "space-y-1 mt-2",
    rowBase,
    rowEven: theme.colors.rowEven,
    rowOdd: theme.colors.rowOdd,
    name: `${theme.colors.name} whitespace-normal break-words`,
    label: theme.colors.label,
    percent: `text-center font-medium ${theme.colors.value}`,
    gram: `text-center font-medium ${theme.colors.value}`,
    pill: `${pillBase} border ${theme.colors.pillBorder}`,
    summary: `grid grid-cols-3 gap-2 pt-1 font-semibold ${theme.colors.value} ${theme.colors.summaryBg} rounded-md px-2 py-2 items-center mt-1`,
    summaryLabel: "font-medium",
    summaryPercent: `text-center font-medium ${theme.colors.value}`,
    summaryGram: "text-center font-semibold",
    resultPlaceholder: `text-center ${theme.colors.placeholder}`,
    resultTotal: "text-center font-bold",
    input: {
        base: theme.input.base,
        textEmpty: theme.input.textEmpty,
        textFilled: theme.input.textFilled,
    },
    // scale
    blockHeader: "flex flex-col gap-2 mb-4",
    blockTitle: `text-lg font-bold ${theme.colors.value} text-center`,
    blockText: `text-sm ${theme.colors.label} text-center`,
    blockInputRow: "flex items-center gap-3",
    inputSmart: `text-lg px-4 py-2 w-full h-14 rounded-md border ${theme.colors.value} bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 transition`,
    inputUnit: `text-md ${theme.colors.placeholder}`,

    // summary table
    paramHeader: "grid grid-cols-[2fr_1fr_1fr] gap-2 font-semibold text-sm pb-1 border-b mb-2",
    paramsTitle: `text-center text-2xl font-bold ${theme.colors.value} mb-4 mt-1`,
    paramHeaderText: `${theme.colors.label} pl-2`,
    paramValueHeader: "text-center",
    paramRangeHeader: "text-right",
    paramValue: `flex justify-center items-center gap-2 font-medium ${theme.colors.value}`,
    paramRange: "text-right text-emerald-600 text-sm font-medium",
    statusDot: "w-2.5 h-2.5 rounded-full",
    dotOk: "bg-green-500",
    dotBad: "bg-red-500",
    getRowClass: (index: number) =>
        `grid grid-cols-[2fr_1fr_1fr] gap-2 px-2 py-1 items-center rounded-md ${
            index % 2 === 1 ? theme.colors.rowOdd : theme.colors.rowEven
        }`,
    actions: {
        wrapper: "mt-3 flex justify-between items-center px-2",
        saveWrapper: "w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition text-base font-semibold flex items-center justify-center gap-2",
        buttonGroup: "flex justify-center items-center space-x-2",
        iconButton: "flex flex-col items-center justify-center w-14 h-14 sm:w-12 sm:h-12 rounded-full shadow-md transition transform hover:scale-95",
        jpgButton: "bg-indigo-600 hover:bg-indigo-700 text-white",
        pdfButton: "bg-emerald-600 hover:bg-emerald-700 text-white",
        iconLabel: "text-[11px] mt-0.5"
    }

});

export const recipeBlockStyles = {
    light: createRecipeBlockLayout(themeLight),
    dark: createRecipeBlockLayout(themeDark),
};
