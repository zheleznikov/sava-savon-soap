
const themeLight = {
    title: "text-emerald-700",
    rowEven: "bg-stone-50/90",
    rowOdd: "bg-white",
    name: "text-gray-700",
    value: "text-gray-800",
    summaryBg: "bg-stone-100",
};

const themeDark = {
    title: "text-emerald-300",
    rowEven: "bg-stone-800/80",
    rowOdd: "bg-stone-900/70",
    name: "text-gray-200",
    value: "text-gray-100",
    summaryBg: "bg-stone-800",
};

const createOilsListLayoutTheme = (theme: typeof themeLight) => ({
    layout: {
        wrapper: "mb-2 mt-1",
        title: `text-md font-semibold ${theme.title} mb-2 mt-1 text-center`,
        list: "space-y-1",
        rowBase: `grid grid-cols-3 gap-2 py-1 rounded-md px-2 items-center`,
        rowEven: theme.rowEven,
        rowOdd: theme.rowOdd,
        name: `${theme.name} whitespace-normal break-words`,
        percent: `text-center font-medium ${theme.value}`,
        gram: `text-center font-medium ${theme.value}`,
        summary: `grid grid-cols-3 gap-2 pt-1 font-semibold ${theme.value} ${theme.summaryBg} rounded-md px-2 py-2 items-center mt-1`,
        summaryLabel: "font-medium",
        summaryPercent: `text-center font-medium ${theme.value}`,
        summaryGram: "text-center font-semibold"
    }
});

export const oilsListStyles = {
    light: createOilsListLayoutTheme(themeLight),
    dark: createOilsListLayoutTheme(themeDark),
};
