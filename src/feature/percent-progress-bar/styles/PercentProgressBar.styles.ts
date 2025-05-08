const themeLight = {
    labelText: "text-gray-800",
    percentHint: "text-gray-500",
    percentHintStrong: "text-gray-700",
    barBorder: "border b-stone-200",
};

const themeDark = {
    labelText: "text-gray-200",
    percentHint: "text-gray-400",
    percentHintStrong: "text-white",
    barBorder: "border b-stone-600",
};

const createProgressBarTheme = (theme: typeof themeLight) => ({
    wrapper: "mt-2 mb-4",
    barOuterWrapper: "h-6 sm:h-7 relative transition-all duration-300",
    barWrapper: `w-full rounded-full h-full relative overflow-hidden ${theme.barBorder}`,
    bar: "absolute top-0 left-0 h-full transition-all duration-300",
    textWrapper: "absolute inset-0 flex items-center justify-center z-10",
    text: `text-xs font-semibold drop-shadow ${theme.labelText}`,
    hint: "h-4 sm:h-5 mt-1 text-center text-xs transition-all duration-300",
    hintText: theme.percentHint,
    hintStrong: `font-bold ${theme.percentHintStrong}`,
});

export const percentProgressStyles = {
    light: createProgressBarTheme(themeLight),
    dark: createProgressBarTheme(themeDark),
};
