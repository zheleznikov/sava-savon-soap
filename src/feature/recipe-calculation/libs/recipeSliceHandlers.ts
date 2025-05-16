import {RecipeState} from "../types/recipeScile.interface";
import {PayloadAction} from "@reduxjs/toolkit/dist";
import {
    InputType, LyeType,
    MeasureInputType,
    WaterInputType
} from "../../../app/providers/SoapRecipeContext.types";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {TAcid} from "../../../entities/oil/model/acids.types";
import {calculateOilSum} from "./calcRecipeUtils";


export const toggleHandlers = {
    // добавление и удаление масла
    toggleOil: (state: RecipeState, action: PayloadAction<TOil>) => {
        const oil = action.payload;
        const isSelected = state.input.ingredients.selectedOils.some((o) => o.id === oil.id);

        const updated = isSelected
            ? state.input.ingredients.selectedOils.filter((o) => o.id !== oil.id)
            : [...state.input.ingredients.selectedOils, oil];

        const total = updated.reduce((sum, o) => sum + (o.mass || 0), 0);

        state.input.ingredients.selectedOils = updated.map((o) => ({
            ...o,
            percent: total > 0 ? (o.mass / total) * 100 : 0
        }));

        state.output.total.totalOilAmount = calculateOilSum({
            selectedOils: state.input.ingredients.selectedOils,
            oilInputType: state.input.params.oilInputType,
            userDefinedTotalWeight: state.input.params.userDefinedTotalWeight,
            waterPercent: state.input.params.waterInput.waterPercent,
            superfatPercent: state.input.params.superfatPercent
        });

        state.status.status = "dirty";
    },

    // добавление и удаление кислоты
    toggleAcid: (state: RecipeState, action: PayloadAction<TAcid>) => {
        const acid = action.payload;
        const isSelected = state.input.ingredients.selectedAcids.some((a) => a.id === acid.id);

        state.input.ingredients.selectedAcids = isSelected
            ? state.input.ingredients.selectedAcids.filter((a) => a.id !== acid.id)
            : [...state.input.ingredients.selectedAcids];
        state.status.status = "dirty";
    },

    // добавление и удаление пользовательского компоненте
    toggleCustom: (state: RecipeState, action: PayloadAction<TCustom>) => {
        const addIngredient = action.payload;
        const isSelected = state.input.ingredients.selectedCustoms.some((a) => a.id === addIngredient.id);

        state.input.ingredients.selectedCustoms = isSelected
            ? state.input.ingredients.selectedCustoms.filter((a) => a.id !== addIngredient.id)
            : [...state.input.ingredients.selectedCustoms];
        state.status.status = "dirty";
    },

}


export const handlers = {
    // обработчик ввода масел - граммы
    updateOilMassWithRecalculatedPercents: (state: RecipeState, action: PayloadAction<{ oilId: number; newGram: number }>) => {
        const {oilId, newGram} = action.payload;

        // Обновление масла в selectedOils
        const updated = state.input.ingredients.selectedOils.map((o) =>
            o.id === oilId ? {...o, gram: newGram} : o
        );

        // Рассчитываем общий вес масел
        const total = updated.reduce((sum, o) => sum + (o.mass || 0), 0);

        // Обновляем selectedOils с пересчитанными процентами
        state.input.ingredients.selectedOils = updated.map((o) => ({
            ...o,
            percent: total > 0 ? (o.mass / total) * 100 : 0
        }));

        // Обновляем totalOilAmount
        state.output.total.totalOilAmount = calculateOilSum({
            selectedOils: state.input.ingredients.selectedOils,
            oilInputType: state.input.params.oilInputType,
            userDefinedTotalWeight: state.input.params.userDefinedTotalWeight,
            waterPercent: state.input.params.waterInput.waterPercent,
            superfatPercent: state.input.params.superfatPercent
        });

        // Пересчитываем и обновляем selectedAcids и selectedCustoms
        state.input.ingredients.selectedAcids = state.input.ingredients.selectedAcids.map((a) => ({
            ...a,
            gram: a.inputType === InputType.Percent && total > 0
                ? (a.percent / 100) * total
                : a.mass,
            percent: a.inputType === InputType.Mass && total > 0
                ? (a.mass / total) * 100
                : a.percent
        }));

        state.input.ingredients.selectedCustoms = state.input.ingredients.selectedCustoms.map((c) => ({
            ...c,
            gram: c.inputType === InputType.Percent && total > 0
                ? (c.percent / 100) * total
                : c.mass,
            percent: c.inputType === InputType.Mass && total > 0
                ? (c.mass / total) * 100
                : c.percent
        }));

        // Обновляем статус
        state.status.status = "dirty";
    },

    // обработчик ввода масел - проценты
    updateOilPercentWithMassRecalculation: (
        state: RecipeState,
        action: PayloadAction<{ oilId: number; newPercent: number; totalOilMass: number }>
    ) => {
        const {oilId, newPercent, totalOilMass} = action.payload;

        // Обновляем процент и граммы для выбранного масла
        state.input.ingredients.selectedOils = state.input.ingredients.selectedOils.map((o) =>
            o.id === oilId
                ? {
                    ...o,
                    percent: newPercent,
                    gram: totalOilMass > 0 ? (newPercent / 100) * totalOilMass : 0
                }
                : o
        );

        // Пересчитываем totalOilAmount
        state.output.total.totalOilAmount = calculateOilSum({
            selectedOils: state.input.ingredients.selectedOils,
            oilInputType: state.input.params.oilInputType,
            userDefinedTotalWeight: state.input.params.userDefinedTotalWeight,
            waterPercent: state.input.params.waterInput.waterPercent,
            superfatPercent: state.input.params.superfatPercent
        });

        // Обновляем статус
        state.status.status = "dirty";
    },

    // обработчик ввода кислот - граммы
    updateAcidMassWithRecalculatedPercents: (
        state: RecipeState,
        action: PayloadAction<{ acidId: number; newGram: number }>
    ) => {
        const {acidId, newGram} = action.payload;

        // Обновляем граммы для выбранной кислоты
        const updated = state.input.ingredients.selectedAcids.map((a) =>
            a.id === acidId ? {...a, gram: newGram} : a
        );

        // Получаем общий вес масел
        const total = state.output.total.totalOilAmount;

        // Обновляем selectedAcids с пересчитанными значениями граммов и процентов
        state.input.ingredients.selectedAcids = updated.map((a) => ({
            ...a,
            gram:
                a.inputType === InputType.Percent && total > 0
                    ? (a.percent / 100) * total
                    : a.mass,
            percent:
                a.inputType === InputType.Mass && total > 0
                    ? (a.mass / total) * 100
                    : a.percent
        }));

        // Обновляем статус
        state.status.status = "dirty";
    },

    // обработчик ввода кислот - проценты
    updateAcidPercentWithMassRecalculation: (
        state: RecipeState,
        action: PayloadAction<{ acidId: number; newPercent: number; }>
    ) => {
        const {acidId, newPercent} = action.payload;

        const total = state.output.total.totalOilAmount;

        state.input.ingredients.selectedAcids = state.input.ingredients.selectedAcids.map((a) =>
            a.id === acidId
                ? {
                    ...a,
                    percent: newPercent,
                    gram: total > 0 ? (newPercent / 100) * total : 0
                }
                : a
        );
        state.status.status = "dirty";
    },

    // обработчик ввода компонента - граммы
    updateCustomMassWithRecalculatedPercents: (
        state: RecipeState,
        action: PayloadAction<{ customId: number; newGram: number }>
    ) => {
        const {customId, newGram} = action.payload;

        // Обновляем граммы для выбранного кастомного ингредиента
        const updated = state.input.ingredients.selectedCustoms.map((c) =>
            c.id === customId ? {...c, gram: newGram} : c
        );

        // Получаем общий вес масел
        const total = state.output.total.totalOilAmount;

        // Обновляем selectedCustoms с пересчитанными значениями граммов и процентов
        state.input.ingredients.selectedCustoms = updated.map((c) => ({
            ...c,
            gram:
                c.inputType === InputType.Percent && total > 0
                    ? (c.percent / 100) * total
                    : c.mass,
            percent:
                c.inputType === InputType.Mass && total > 0
                    ? (c.mass / total) * 100
                    : c.percent
        }));

        // Обновляем статус
        state.status.status = "dirty";
    },

    // обработчик ввода своего компонента - проценты
    updateCustomPercentWithMassRecalculation: (
        state: RecipeState,
        action: PayloadAction<{ customId: number; newPercent: number }>
    ) => {
        const {customId, newPercent} = action.payload;

        // Получаем общий вес масел
        const total = state.output.total.totalOilAmount;

        // Обновляем кастомные ингредиенты с пересчитанными процентами и массами
        state.input.ingredients.selectedCustoms = state.input.ingredients.selectedCustoms.map((c) =>
            c.id === customId
                ? {
                    ...c,
                    percent: newPercent,
                    gram: total > 0 ? (newPercent / 100) * total : 0
                }
                : c
        );

        state.status.status = "dirty";
    },
}

