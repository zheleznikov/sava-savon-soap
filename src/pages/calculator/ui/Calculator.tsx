import {FC, useEffect} from "react";
import {RecipeSummaryBlock} from "../../../widgets/recipe-summary/RecipeSummaryBlock";
import {clsx} from "clsx";
import {calculator} from "../../../shared/styles/layout";
import {useSoapRecipe} from "../../../feature/recipe-calculation/model/useSoapRecipe";
import {useLocation} from "react-router-dom";
import {TOil} from "../../../entities/oil/model/oil.types";
import {LyeType} from "../../../app/providers/SoapRecipeContext.types";
import {oils} from "../../../entities/oil/model/oils";
import {RecipeBuilder} from "@/widgets/recipe-builder";


export const Calculator: FC = () => {
    const location = useLocation();
    const context = useSoapRecipe(); // доступ к сеттерам

    const mode = (location.state as any)?.mode ?? "new";

    useEffect(() => {
        if (location.state) {
            const state = location.state as {
                recipeName: string;
                selectedOils: TOil[];
                totalOilAmount: number;
                totalLyeAmount: number;
                totalWaterAmount: number;
                totalResultAmount: number;
                lyeType: LyeType;
                superfatPercent: number;
                waterPercent: number;
                properties: any;
            };

            // "Гидратация" масел: восстанавливаем реальные объекты масел из базы
            const realSelectedOils = state.selectedOils.map(oilFromState => {
                const realOil = oils.find(o => o.id === oilFromState.id);
                if (!realOil) return oilFromState; // fallback, если вдруг масло не найдено

                return {
                    ...realOil, // берём оригинальные свойства масла
                    gram: oilFromState.gram, // подставляем сохранённые граммы
                    percent: oilFromState.percent, // подставляем сохранённые проценты
                };
            });

            // Теперь всё применяем
            context.setRecipeName(state.recipeName);
            context.setSelectedOils(realSelectedOils);
            context.setLyeType(state.lyeType);
            context.setSuperfatPercent(state.superfatPercent);
            context.setWaterPercent(state.waterPercent);

            if (state.totalOilAmount) {
                context.setUserDefinedTotalWeight(state.totalOilAmount);
            }

        }
    }, [location.state]);

    return (
        <section className={clsx(calculator.wrapper.layout, calculator.wrapper.theme.light, "relative")}>
            {mode === "edit" && (
                <div className="w-full bg-yellow-100 text-yellow-800 text-center py-2 rounded mb-4 transition-opacity duration-500 opacity-100">
                    Вы редактируете сохранённый рецепт: <b>{context.recipeName}</b> {/* БЕРЁМ ИЗ КОНТЕКСТА */}
                </div>
            )}
            <div className={calculator.main.layout}>
                <RecipeBuilder/>
                <RecipeSummaryBlock/>
            </div>
        </section>
    );
};
