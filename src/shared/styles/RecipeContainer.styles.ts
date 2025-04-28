// === Recipe section wrapper ===

import {colors, common} from "./layout";

export const recipeContainerStyles = {
    layout: `
        w-full 
        lg:w-1/2 
        ${colors.light.border}
        ${common.blur}
        ${common.borderRadius}
       shadow
        p-4 
        ${common.transition}
        transform relative z-10
        hover:shadow-xl hover:scale-[1.002]
    `,
    theme: {
        light: `${colors.light.bg} hover:bg-white/90 hover:border-purple-150`,
        dark: `${colors.dark.bg} hover:bg-gray-800/90 hover:border-gray-600`,
    }
};
