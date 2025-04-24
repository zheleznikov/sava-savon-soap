// === Общие переменные для темы light ===
const main_bg_light = "bg-white";
const text_accent_light = "text-emerald-600";
const border_light = "border-pink-100";
const sidebar_border_light = "border-gray-200";
const text_default_light = "text-gray-700";
const hover_accent_light = "hover:text-emerald-600";
const overlay_light = "bg-black/30 backdrop-blur-sm";
const close_hover_light = "hover:text-red-500";

// === Общие переменные для темы dark ===
const main_bg_dark = "bg-gray-900";
const text_accent_dark = "text-emerald-400";
const border_dark = "border-gray-700";
const sidebar_border_dark = "border-gray-700";
const text_default_dark = "text-gray-300";
const hover_accent_dark = "hover:text-emerald-400";
const overlay_dark = "bg-black/50 backdrop-blur-md";
const close_hover_dark = "hover:text-red-400";

export const navbar = {
    base: "fixed w-full z-50 transition-transform duration-300",
    container: "max-w-[1600px] mx-auto",
    header: "flex justify-between h-16 items-center px-4",

    sidebar: {
        base: "fixed top-0 left-0 z-50 w-64 h-full transform transition-transform duration-300",
    },

    light: {
        style: `${main_bg_light} shadow-lg border-b ${border_light} shadow-sm`,
        logo: `text-xl font-bold ${text_accent_light}`,

        desktop_menu: "hidden md:flex space-x-6",
        desktop_link: `text-lg font-medium transition ${hover_accent_light}`,
        desktop_link_active: text_accent_light,
        desktop_link_inactive: text_default_light,

        mobile_menu_button: `text-gray-600 ${hover_accent_light}`,
        mobile_overlay: `fixed inset-0 z-40 ${overlay_light} transition-opacity duration-300`,

        sidebar_style: `${main_bg_light} shadow-lg border-r ${sidebar_border_light} rounded-r-xl`,
        sidebar_header: "flex items-center justify-between px-4 py-4 border-b",
        sidebar_title: `text-xl font-bold ${text_accent_light}`,
        sidebar_close_button: `text-gray-600 ${close_hover_light}`,
        sidebar_nav: "flex flex-col gap-3 px-4 py-6",
        sidebar_link: `text-xl font-medium transition ${hover_accent_light}`,
        sidebar_link_active: text_accent_light,
        sidebar_link_inactive: text_default_light,
    },

    dark: {
        style: `${main_bg_dark} shadow-md border-b ${border_dark}`,
        logo: `text-xl font-bold ${text_accent_dark}`,

        desktop_menu: "hidden md:flex space-x-6",
        desktop_link: `text-lg font-medium transition ${hover_accent_dark}`,
        desktop_link_active: text_accent_dark,
        desktop_link_inactive: text_default_dark,

        mobile_menu_button: `text-gray-300 ${hover_accent_dark}`,
        mobile_overlay: `fixed inset-0 z-40 ${overlay_dark} transition-opacity duration-300`,

        sidebar_style: `bg-gray-800 shadow-md border-r ${sidebar_border_dark} rounded-r-xl`,
        sidebar_header: "flex items-center justify-between px-4 py-4 border-b border-gray-700",
        sidebar_title: `text-xl font-bold ${text_accent_dark}`,
        sidebar_close_button: `text-gray-400 ${close_hover_dark}`,
        sidebar_nav: "flex flex-col gap-3 px-4 py-6",
        sidebar_link: `text-xl font-medium transition ${hover_accent_dark}`,
        sidebar_link_active: text_accent_dark,
        sidebar_link_inactive: text_default_dark,
    },
};
