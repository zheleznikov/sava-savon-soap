import {RecipeState} from "../types/recipeScile.interface";
import {PayloadAction} from "@reduxjs/toolkit/dist";
import {TOil} from "../../../entities/oil/model/oil.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {TAcid} from "../../../entities/oil/model/acids.types";


export const toggleHandlers = {
    // добавление и удаление масла
    toggleOil: (state: RecipeState, action: PayloadAction<TOil>) => {
        const oil = action.payload;
        const isSelected = state.input.ingredients.selectedOils.some((o) => o.id === oil.id);

        // Просто обновляем массив, проценты трогать не надо!
        state.input.ingredients.selectedOils = isSelected
            ? state.input.ingredients.selectedOils.filter((o) => o.id !== oil.id)
            : [...state.input.ingredients.selectedOils, oil];

    },


    toggleAcid: (state: RecipeState, action: PayloadAction<TAcid>) => {
        const acid = action.payload;
        const isSelected = state.input.ingredients.selectedAcids.some((a) => a.id === acid.id);

        state.input.ingredients.selectedAcids = isSelected
            ? state.input.ingredients.selectedAcids.filter((a) => a.id !== acid.id)
            : [...state.input.ingredients.selectedAcids, acid];

    },

    // добавление и удаление пользовательского компоненте
    toggleCustom: (state: RecipeState, action: PayloadAction<TCustom>) => {
        const addIngredient = action.payload;
        const isSelected = state.input.ingredients.selectedCustoms.some((a) => a.id === addIngredient.id);

        state.input.ingredients.selectedCustoms = isSelected
            ? state.input.ingredients.selectedCustoms.filter((a) => a.id !== addIngredient.id)
            : [...state.input.ingredients.selectedCustoms, addIngredient];
    },

}


export const handlers = {
    // обработчик ввода масел - граммы
    updateOilMassWithRecalculatedPercents: (
        state: RecipeState,
        action: PayloadAction<{ oilId: number; newMass: number }>
    ) => {
        const {oilId, newMass} = action.payload;

        // Просто обновляем массу
        state.input.ingredients.selectedOils = state.input.ingredients.selectedOils.map((o) =>
            o.id === oilId ? {...o, mass: newMass} : o
        );

    },
    // обработчик ввода масел - проценты
    updateOilPercent: (
        state: RecipeState,
        action: PayloadAction<{ oilId: number; newPercent: number }>
    ) => {
        const {oilId, newPercent} = action.payload;
        state.input.ingredients.selectedOils = state.input.ingredients.selectedOils.map(o =>
            o.id === oilId ? {...o, percent: newPercent} : o
        );
        state.status.status = "dirty";
    },

    // обработчик ввода кислот - граммы
    updateAcidMassWithRecalculatedPercents: (
        state: RecipeState,
        action: PayloadAction<{ acidId: number; newMass: number }>
    ) => {
        const { acidId, newMass } = action.payload;

        state.input.ingredients.selectedAcids = state.input.ingredients.selectedAcids.map((a) =>
            a.id === acidId ? { ...a, mass: newMass } : a
        );
    },

    // обработчик ввода кислот - проценты
    updateAcidPercentWithMassRecalculation: (
        state: RecipeState,
        action: PayloadAction<{ acidId: number; newPercent: number }>
    ) => {
        const { acidId, newPercent } = action.payload;

        state.input.ingredients.selectedAcids = state.input.ingredients.selectedAcids.map((a) =>
            a.id === acidId ? { ...a, percent: newPercent } : a
        );
    },


    // обработчик ввода компонента - граммы
    updateCustomMassWithRecalculatedPercents: (
        state: RecipeState,
        action: PayloadAction<{ customId: number; newMass: number }>
    ) => {
        const {customId, newMass} = action.payload;

        state.input.ingredients.selectedCustoms = state.input.ingredients.selectedCustoms.map((c) =>
            c.id === customId ? { ...c, mass: newMass } : c
        );
    },

    // обработчик ввода своего компонента - проценты
    updateCustomPercentWithMassRecalculation: (
        state: RecipeState,
        action: PayloadAction<{ customId: number; newPercent: number }>
    ) => {
        const {customId, newPercent} = action.payload;

        state.input.ingredients.selectedCustoms = state.input.ingredients.selectedCustoms.map((c) =>
            c.id === customId ? { ...c, percent: newPercent } : c
        );
    },
}

