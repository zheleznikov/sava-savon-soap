// === Общие утилиты ===
export const common = {
    borderRadius: "rounded-xl",
    borderRadiusFull: "rounded-full",
    shadowSm: "shadow-sm",
    shadowMd: "shadow-md",
    blur: "backdrop-blur-sm",
    blurMd: "backdrop-blur-md",
    inputPadding: "p-2 pt-4 pb-4",
    transition: "transition duration-200",
    flexColumn: "flex flex-col",
    labelText: "text-sm text-gray-600 mb-1",
    textSm: "text-sm",
};

export const colors = {
    light: {
        border: "border border-gray-200",
        bg: "bg-white/70",
        text: "text-gray-800",
        labelText: "text-gray-600",
        inputDisabled: "bg-gray-100 text-gray-500 cursor-not-allowed",
        unitText: "text-gray-500",
    },
    dark: {
        border: "border border-gray-700",
        bg: "bg-gray-900/50",
        text: "text-white",
        unitText: "text-gray-300",
    },
};

// === Темы ===
export const theme = {
    light: "bg-gradient-to-r from-pink-50 via-gray-100 to-pink-50",
    dark: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
};

// === Layout ===
export const layout = {
    page: "min-h-screen flex p-2",
    wrapper: "mx-auto max-w-8xl flex flex-col lg:flex-row flex-grow justify-center"
};

// === Autocomplete ===
export const autocomplete = {
    layout: {
        input: `w-full ${common.inputPadding} ${common.shadowSm}`,
        clear: "absolute right-9 top-1/2 -translate-y-1/2",
        arrow: "absolute right-3 top-1/2 -translate-y-1/2",
        dropdown: "absolute z-50 w-full max-h-60 overflow-y-auto top-full left-0",
        dropdown_item: "flex items-center gap-2 px-2 py-1 cursor-pointer transition"
    },
    theme: {
        light: {
            input: `${colors.light.border} ${colors.light.bg} ${colors.light.text} focus:border-gray-200 focus:outline-none focus:ring-0`,
            clear: "text-gray-400",
            dropdown: `${common.blur} ${colors.light.border} border-t-0 shadow rounded-b-xl bg-white`,
            dropdown_checkbox: "form-checkbox text-emerald-500 accent-emerald-500",
            dropdown_item: "hover:bg-emerald-50",
            dropdown_item_checked: "bg-emerald-100 font-medium"
        },
        dark: {
            input: `${colors.dark.border} ${colors.dark.bg} ${colors.dark.text} focus:border-gray-500 focus:outline-none focus:ring-0`,
            clear: "text-white",
            dropdown: `${common.blur} ${colors.dark.border} border-t-0 shadow rounded-b-xl bg-gray-800`,
            dropdown_checkbox: "form-checkbox text-emerald-500 accent-emerald-500",
            dropdown_item: "hover:bg-emerald-50",
            dropdown_item_checked: "bg-emerald-100 font-medium"
        }
    }
};

// === Calculator ===
export const calculator = {
    wrapper: {
        layout: `max-w-4xl ${common.borderRadius} p-2 sm:p-8 flex-grow`,
        theme: {
            light: `${colors.light.bg} ${common.blurMd} ${common.shadowMd}`,
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

// === Input block wrapper ===
export const input_block_wrapper = {
    layout: `${colors.light.border} ${common.borderRadius} ${common.blur} ${common.shadowSm}  p-4 mb-4 `,
    // layout: "border border-gray-200 rounded-xl p-4 backdrop-blur-sm shadow-sm mb-4",
    theme: {
        light: colors.light.bg,
        dark: ""
    }
};

// === Input fields ===
export const input = {
    recipe_name: {
        layout: `w-full ${common.inputPadding} ${common.blur} ${common.shadowSm} ${common.borderRadius} mb-4`,
        theme: {
            light: `${colors.light.border} ${colors.light.bg} focus:border-gray-200 focus:outline-none focus:ring-0`,
            dark: `${colors.light.border} ${colors.light.bg}`
        }
    },
    toggle_input_type: {
        layout: {
            wrapper: "flex flex-wrap gap-6 sm:gap-8",
            field_wrapper: common.flexColumn,
            weight_row: "flex items-center gap-1",
        },
        theme: {
            light: {
                label: common.labelText,
                button_base: `px-4 py-1 ${common.textSm} ${common.transition}`,
                button_active: "bg-emerald-500 text-white",
                button_inactive: "bg-white text-gray-700 hover:bg-gray-100",
                input_base: "w-[120px] text-sm",
                input_disabled: colors.light.inputDisabled,
                hint: "text-xs mt-1 transition-opacity duration-200 min-h-[1rem]",
                hint_visible: "text-gray-400 opacity-100 visible",
                hint_hidden: "opacity-0 invisible",
                button_group: `flex ${colors.light.border} ${common.borderRadius} overflow-hidden w-fit`,
                unit_text: colors.light.unitText,
            },
            dark: {}
        }
    }
};
