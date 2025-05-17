import {formatNumber} from "@/shared/lib/utils";

/**
 * Суммирует проценты масел.
 */
export const calculatePercentSum = (selectedOils: { percent?: number }[]): number =>
    parseFloat(
        formatNumber(selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0))
    );

/**
 * Проверяет, находится ли сумма процентов в допустимом диапазоне.
 */
export const isPercentInvalid = (percentSum: number): boolean =>
    percentSum !== 100;

/**
 * Возвращает цвет прогрессбара на основе процента.
 */
export const getProgressBarColor = (percent: number): string => {
    if (percent < 50) return "bg-red-700";
    if (percent < 60) return "bg-red-600";
    if (percent < 70) return "bg-orange-600";
    if (percent < 80) return "bg-orange-500";
    if (percent < 90) return "bg-yellow-400";
    if (percent < 95) return "bg-yellow-300";
    if (percent < 100) return "bg-yellow-300";
    if (percent === 100) return "bg-emerald-400";
    if (percent <= 105) return "bg-yellow-300";
    if (percent <= 110) return "bg-yellow-300";
    if (percent <= 115) return "bg-yellow-400";
    if (percent <= 120) return "bg-orange-500";
    if (percent <= 130) return "bg-orange-600";
    return "bg-red-700";
};
