// shared/styles/infoPopupStyles.ts
const base = {
    overlay: "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50",
    popup: "rounded-lg shadow-lg p-4 max-w-md w-full max-h-[95vh] relative transition-all flex flex-col",
    closeButton: "absolute top-2 right-2 hover:transition-colors",
    icon: "w-8 h-8",
    content: "text-sm overflow-y-auto mt-4", // отступ сверху, чтобы не перекрыть кнопку
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
