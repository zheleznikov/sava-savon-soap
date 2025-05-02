import {TOil} from "../../../entities/oil/model/oil.types";

/**
 * Считает суммарный процент всех выбранных масел.
 */
export const getTotalOilPercent = (selectedOils: TOil []): number =>
    selectedOils.reduce((sum, oil) => sum + (oil.percent || 0), 0);
