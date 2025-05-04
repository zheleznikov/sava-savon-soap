const themeLight = {
    baseText: "text-gray-800",
    containerBg: "bg-white/40",
    tableBorder: "border-gray-200",
    tableHeader: "bg-gray-100",
    listMarker: "list-disc list-inside",
    tabActive: "bg-indigo-600 text-white border-indigo-600",
    tabInactive: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
};

const themeDark = {
    baseText: "text-gray-100",
    containerBg: "bg-gray-800/40",
    tableBorder: "border-gray-700",
    tableHeader: "bg-gray-800",
    listMarker: "list-disc list-inside",
    tabActive: "bg-emerald-400 text-black border-emerald-400",
    tabInactive: "bg-gray-900 text-gray-100 border-gray-700 hover:bg-gray-800",


};

const createStyle = (theme: typeof themeLight) => ({
    container: `w-full ${theme.containerBg} lg:w-1/2 max-w-2xl mx-auto py-8 px-4 text-base leading-relaxed shadow rounded-xl ${theme.baseText}`,
    tabWrapper: "grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-6",
    header: "text-2xl font-bold mb-6 text-center",
    sectionTitle: "text-xl font-semibold mb-4 text-center",
    list: `${theme.listMarker} ml-4 space-y-1`,
    table: `w-full text-sm text-left border ${theme.tableBorder}`,
    tableHead: `${theme.tableHeader}`,
    tableCell: "border px-3 py-2",
    tabButton: {
        base: "px-4 py-2 rounded text-sm border transition-colors",
        active: theme.tabActive,
        inactive: theme.tabInactive
    },
});


export const explanationPageStyles = {
    light: createStyle(themeLight),
    dark: createStyle(themeDark),
};
