// === Базовые переменные light ===
const themeLight = {
    mainBg: "bg-white",
    textAccent: "text-gray-800",
    textDefault: "text-gray-700",
    border: "border-pink-100",
};

// === Базовые переменные dark ===
const themeDark = {
    mainBg: "bg-gray-900",
    textAccent: "text-white",
    textDefault: "text-gray-300",
    border: "border-gray-700",
};

// === Функция для создания темы AboutPage ===
const createAboutTheme = (theme: typeof themeLight) => ({
    wrapper: `max-w-2xl mx-auto px-4 py-8 ${theme.textDefault}`,
    title: `text-3xl font-bold mb-6 text-center ${theme.textAccent}`,
    paragraph: "space-y-4 text-lg",
});

// === Экспорт about-стилей ===
export const about = {
    light: createAboutTheme(themeLight),
    dark: createAboutTheme(themeDark),
};
