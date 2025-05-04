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
        bg: "bg-white/50",
        text: "text-gray-800",
        inputDisabled: "bg-gray-100 text-gray-500 cursor-not-allowed",
        unitText: "text-gray-500",
        radioText: "text-gray-700",
        radioBg: "bg-white",
        radioHover: "hover:bg-gray-100",
        radioActiveBg: "bg-indigo-500",
        radioActiveText: "text-white",
        labelText: "text-gray-600",
    },
    dark: {
        border: "border border-gray-700",
        bg: "bg-gray-900/90",
        inputDisabled: "bg-gray-700 text-gray-500 cursor-not-allowed border-none",
        text: "text-white",
        unitText: "text-gray-300",
        radioText: "text-gray-300",
        radioBg: "bg-gray-800",
        radioHover: "hover:bg-gray-700",
        radioActiveBg: "bg-emerald-400",
        radioActiveText: "text-white",
        labelText: "text-white"
    },
};

export const smartInput = {
    light: `${colors.light.bg} ${colors.light.text}`,
    dark: `border border-gray-700 ${colors.dark.bg} ${colors.dark.text}`
}

// === Темы ===
export const theme = {
    light: "bg-gradient-to-r from-pink-50 via-gray-100 to-pink-50",
    dark: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
};

// === Layout ===
export const layout = {
    page: "min-h-screen flex p-0 pt-16 md:pt-10 lg:p-2 lg:pt-20",
    wrapper: "mx-auto max-w-8xl flex flex-col lg:flex-row flex-grow justify-start"
};





export const pageHeader = {
    layout: "w-full text-3xl xs:text-4xl text-center font-bold min-h-[2.5rem] bg-transparent outline-none transition ",
    theme: {
        light: "text-gray-700",
        dark: "text-white"
    }
};





