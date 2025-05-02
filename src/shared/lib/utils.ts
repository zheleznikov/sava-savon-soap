export const formatNumber = (value: number, digits = 2) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

export const isApp = () => {
    return typeof window !== "undefined" && (
        (window as any).Capacitor !== undefined ||
        window.matchMedia?.("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true
    );
};
