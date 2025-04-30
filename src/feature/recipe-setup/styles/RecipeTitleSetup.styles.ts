import {colors, common} from "../../../shared/styles/layout";

export const recipeTitleSetupStyles = {
    recipeTitle: {
        layout: `w-full ${common.inputPadding} ${common.blur} ${common.shadowSm} ${common.borderRadius} mb-4`,
        theme: {
            light: `${colors.light.border} ${colors.light.bg} focus:border-gray-200 focus:outline-none focus:ring-0`,
            dark: `${colors.dark.border} ${colors.dark.bg} text-white focus:border-gray-900 focus:outline-none focus:ring-0`
        }
    }
};