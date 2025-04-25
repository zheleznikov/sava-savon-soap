// === Базовые переменные light ===
const themeLight = {
    mainBg: "bg-white",
    textAccent: "text-emerald-600",
    textDefault: "text-gray-700",
    border: "border-pink-100",
    sidebarBorder: "border-gray-200",
    hoverAccent: "hover:text-emerald-500",
    overlay: "bg-black/30 backdrop-blur-sm",
    closeHover: "hover:text-red-500",
};

// === Базовые переменные dark ===
const themeDark = {
    mainBg: "bg-gray-900",
    textAccent: "text-emerald-400",
    textDefault: "text-gray-300",
    border: "border-gray-700",
    sidebarBorder: "border-gray-700",
    hoverAccent: "hover:text-emerald-400",
    overlay: "bg-black/50 backdrop-blur-md",
    closeHover: "hover:text-red-400",
};

// === Функция для создания темы навбара ===
const createNavbarTheme = (theme: typeof themeLight) => ({
    style: `${theme.mainBg} shadow-lg border-b ${theme.border} shadow-sm`,
    logo: `text-xl font-bold ${theme.textAccent}`,

    desktop_menu: "hidden md:flex space-x-6",
    desktop_link: `text-lg font-medium transition ${theme.hoverAccent}`,
    desktop_link_active: theme.textAccent,
    desktop_link_inactive: theme.textDefault,

    mobile_menu_button: `text-gray-600 ${theme.hoverAccent}`,
    mobile_overlay: `fixed inset-0 z-40 ${theme.overlay} transition-opacity duration-300 ease-in-out`,

    sidebar_style: theme === themeLight
        ? `bg-gradient-to-r from-pink-50 via-gray-100 to-pink-50 shadow-lg px-4 py-4 ${theme.sidebarBorder}`
        : `bg-gray-800 shadow-md border-r ${theme.sidebarBorder}`,

    sidebar_header: "flex items-center justify-between px-4 py-4 w-full",
    sidebar_title: `text-xl font-bold ${theme.textAccent}`,
    sidebar_close_button: `text-gray-600 ${theme.closeHover}`,
    sidebar_nav: "flex flex-col gap-3 px-4 py-6",
    sidebar_link: `text-xl font-medium transition ${theme.hoverAccent}`,
    sidebar_link_active: theme.textAccent,
    sidebar_link_inactive: theme.textDefault,
});

// === Финальный экспорт навбара ===
export const navbar = {
    base: "fixed w-full z-50 transition-transform duration-300",
    container: "max-w-[1600px] mx-auto",
    header: "flex justify-between h-16 items-center px-4",

    sidebar: {
        base: "fixed top-0 left-0 z-50 w-full h-full transform transition-transform duration-300 ease-in-out",
    },

    light: createNavbarTheme(themeLight),
    dark: createNavbarTheme(themeDark),
};
