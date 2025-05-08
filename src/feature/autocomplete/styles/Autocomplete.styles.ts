import {colors, common} from "../../../shared/styles/layout";

export const autocompleteStyles = {
    layout: {
        input: `w-full ${common.inputPadding} ${common.shadowSm}`,
        clear: "absolute right-9 top-1/2 -translate-y-1/2",
        arrow: "absolute right-3 top-1/2 -translate-y-1/2",
        dropdown: "absolute z-50 w-full max-h-60 overflow-y-auto top-full left-0",
        dropdownItem: "flex items-center gap-2 px-2 py-1 cursor-pointer transition"
    },
    theme: {
        light: {
            input: `${colors.light.border} ${colors.light.bg} ${colors.light.text} focus:border-gray-200 focus:outline-none focus:ring-0`,
            clear: "text-gray-400",
            dropdown: `${common.blur} ${colors.light.border} border-t-0 shadow rounded-b-xl bg-white`,
            dropdownCheckbox: "form-checkbox text-indigo-500 accent-indigo-500",
            dropdownItem: "hover:bg-indigo-50",
            dropdownItemChecked: "bg-indigo-100 font-medium"
        },
        dark: {
            input: `${colors.dark.border} ${colors.dark.bg} ${colors.dark.text} focus:border-gray-500 focus:outline-none focus:ring-0`,
            clear: "text-white",
            dropdown: `${common.blur} ${colors.dark.border} border-t-0 shadow rounded-b-xl bg-gray-800`,
            dropdownCheckbox: "form-checkbox text-emerald-500 accent-emerald-500",
            dropdownItem: `hover:bg-gray-700 text-gray-400`,
            dropdownItemChecked: "bg-gray-700 font-semibold text-emerald-400",
        }
    }
};
