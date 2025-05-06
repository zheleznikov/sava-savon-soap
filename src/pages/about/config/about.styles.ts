const themeLight = {
    mainBg: "bg-white",
    textAccent: "text-gray-800",
    textDefault: "text-gray-700",
    border: "border-pink-100",
    containerBg: "bg-white/20",
};

const themeDark = {
    mainBg: "bg-gray-900",
    textAccent: "text-white",
    textDefault: "text-gray-300",
    border: "border-gray-700",
    containerBg: "bg-gray-800/40"
};

const createAboutTheme = (theme: typeof themeLight) => ({
    // wrapper: `max-w-2xl mx-auto px-4 py-8 ${theme.textDefault}`,
    wrapper: `w-full lg:w-1/2 max-w-2xl mx-auto py-8 px-4 text-base leading-relaxed shadow rounded-xl ${theme.textDefault} ${theme.containerBg} ${theme.textDefault}`,
    title: `text-3xl font-bold mb-6 text-center ${theme.textAccent}`,
    paragraph: "space-y-4 text-lg",
});

export const about = {
    light: createAboutTheme(themeLight),
    dark: createAboutTheme(themeDark),
};
