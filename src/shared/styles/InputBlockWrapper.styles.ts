// === Input block wrapper ===
import {colors, common} from "./layout";

export const inputBlockWrapperStyles = {
    layout: `${colors.light.border} ${common.borderRadius} ${common.blur} ${common.shadowSm} p-4 mb-4 `,

    theme: {
        light: `${colors.light.bg} ${colors.light.border}`,
        dark: `${colors.dark.bg} ${colors.dark.border}`
    }
};
