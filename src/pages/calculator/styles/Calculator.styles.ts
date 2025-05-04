// === Calculator ===
import {colors, common} from "../../../shared/styles/layout";

export const calculator = {
    wrapper: {
        layout: `w-full lg:w-[70%] xl:w-[60%] max-w-[1600px] rounded-none sm:rounded-xl p-2 sm:p-4 flex-grow mx-auto`,
        theme: {
            light: `${colors.light.bg} ${common.blurMd} ${common.shadowMd}`,
            dark: `${colors.dark.bg} ${common.blurMd} ${common.shadowMd}`,
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
    },
    editInfoLine: "w-full bg-yellow-100 text-yellow-800 text-center py-2 rounded mb-4 transition-opacity duration-500 opacity-100"
};
