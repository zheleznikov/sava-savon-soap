export const theme = {
    light: "bg-gradient-to-r from-pink-50 via-gray-100 to-pink-50",
    dark: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
};

export const layout = {
    page: "min-h-screen flex p-2",
    wrapper: "mx-auto max-w-8xl flex flex-col lg:flex-row flex-grow justify-center"
};


export const autocomplete = {
    layout: {
        input: "w-full p-2 pt-4 pb-4 shadow-sm",
        clear: "absolute right-9 top-1/2 -translate-y-1/2",
        arrow: "absolute right-3 top-1/2 -translate-y-1/2",
        dropdown: "absolute z-50 w-full max-h-60 overflow-y-auto top-full left-0",
        dropdown_item: "flex items-center gap-2 px-2 py-1 cursor-pointer transition"
    },
    theme: {
        light: {
            input: "border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-800 focus:border-gray-200 focus:outline-none focus:ring-0",
            clear: "text-gray-400",
            dropdown: "backdrop-blur-sm border border-t-0 shadow rounded-b-xl bg-white",
            dropdown_checkbox: "form-checkbox text-emerald-500 accent-emerald-500",
            dropdown_item: "hover:bg-emerald-50",
            dropdown_item_checked: "bg-emerald-100 font-medium"
        },
        dark: {
            input: "border border-gray-700 bg-gray-900/50 backdrop-blur-sm text-white focus:border-gray-500 focus:outline-none focus:ring-0",
            clear: "text-white",
            dropdown: "backdrop-blur-sm border border-t-0 shadow rounded-b-xl bg-gray-800",
            dropdown_checkbox: "form-checkbox text-emerald-500 accent-emerald-500",
            dropdown_item: "hover:bg-emerald-50",
            dropdown_item_checked: "bg-emerald-100 font-medium"
        }
    }
};

export const calculator = {
    wrapper: {
        layout: "max-w-4xl rounded-2xl p-2 sm:p-8 flex-grow",
        theme: {
            light: "bg-white/70 backdrop-blur-md shadow-md",
            dark: "",
        }
    },
    header: {
        layout: "text-3xl sm:text-4xl font-bold mb-8 text-center tracking-tight drop-shadow-sm",
        theme: {
            light: "text-emerald-700",
            dark: "text-emerald-700"
        }

    },
    main: {
      layout: "flex flex-col lg:flex-row gap-4"
    }
};

export const input = {
    recipe_name: {
        layout: "w-full border  p-2 pt-4 pb-4 backdrop-blur-sm shadow-sm rounded-xl mb-4",
        theme: {
            light: "border-gray-200 bg-white/70 focus:border-gray-200 focus:outline-none focus:ring-0",
            dark: "border-gray-200 bg-white/70 "
        }
    }
}

