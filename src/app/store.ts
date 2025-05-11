import { configureStore } from '@reduxjs/toolkit';
import {recipeSlice} from "../feature/recipe-calculation/model/recipeSlice";

export const store = configureStore({
    reducer: {
        recipe: recipeSlice.reducer
    },
    // devTools: process.env.NODE_ENV !== 'production'
});

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
