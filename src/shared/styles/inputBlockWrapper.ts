// === Input block wrapper ===
import {colors, common} from "./layout";

export const input_block_wrapper = {
    layout: `${colors.light.border} ${common.borderRadius} ${common.blur} ${common.shadowSm} p-4 mb-4 `,
    // layout: "border border-gray-200 rounded-xl p-4 backdrop-blur-sm shadow-sm mb-4",
    theme: {
        light: colors.light.bg,
        dark: colors.dark.bg
    }
};