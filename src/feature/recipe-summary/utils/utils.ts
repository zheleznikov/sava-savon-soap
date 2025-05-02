import {TOil} from "../../../entities/oil/model/oil.types";

/**
 * Считает суммарный процент всех выбранных масел.
 */
export const getTotalOilPercent = (selectedOils: TOil []): number =>
    selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);


export const isInRange = (value: number, range: string): boolean => {
    const [min, max] = range.split(/[–-]/).map((n) => parseFloat(n.trim()));
    return value >= min && value <= max;
}
