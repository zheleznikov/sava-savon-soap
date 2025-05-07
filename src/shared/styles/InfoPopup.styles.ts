// shared/styles/infoPopupStyles.ts
const base = {
    overlay: "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50",
    popup: "rounded-lg shadow-lg p-6 max-w-md w-full relative transition-all",
    closeButton: "absolute top-2 right-2 hover:transition-colors",
    icon: "w-5 h-5",
    content: "text-sm",
};

const themeLight = {
    popupBg: "bg-white",
    textColor: "text-gray-700",
    closeColor: "text-gray-500 hover:text-gray-800",
};

const themeDark = {
    popupBg: "bg-gray-900 border border-gray-500",
    textColor: "text-gray-300",
    closeColor: "text-gray-400 hover:text-white",
};

const createTheme = (theme: typeof themeLight) => ({
    ...base,
    popup: `${base.popup} ${theme.popupBg}`,
    content: `${base.content} ${theme.textColor}`,
    closeButton: `${base.closeButton} ${theme.closeColor}`,
});

export const infoPopupStyles = {
    light: createTheme(themeLight),
    dark: createTheme(themeDark),
};
