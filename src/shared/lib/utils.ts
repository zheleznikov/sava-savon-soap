export const formatNumber = (value: number, digits = 2) =>
    new Intl.NumberFormat("ru-RU", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);