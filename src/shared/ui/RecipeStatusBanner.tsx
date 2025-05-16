import { FC, ReactNode } from 'react';
import {useAppSelector} from "../useAppSelector";
import {calculateRecipe} from "../../feature/recipe-calculation/model/recipeSlice";
import {useAppDispatch} from "../model/useAppDispatch";

interface Props {
    children?: ReactNode;
}

export const RecipeStatusBanner: FC<Props> = ({ children }) => {
    const status = useAppSelector((state) => state.recipe.status);
    const hasEverCalculated = useAppSelector((state) => state.recipe.hasEverCalculated);

    const dispatch = useAppDispatch();
    const handleCalculate = () => dispatch(calculateRecipe());

    // if (status === 'calculating') {
    //     return (
    //         <div className="text-blue-500 px-4 py-2 text-sm">
    //             🔄 Рецепт рассчитывается...
    //         </div>
    //     );
    // }
    //
    // if (status === 'dirty' && hasEverCalculated) {
    //     return (
    //         <div className="text-gray-800 font-medium text-sm flex flex-col relative w-full h-full px-0">
    //             <p className={"block top-2 left-2"}>
    //                 Параметры изменились. Нажмите «Рассчитать», чтобы обновить рецепт.
    //             </p>
    //             <button
    //                 onClick={handleCalculate}
    //                 className="text-lg  bg-emerald-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-emerald-600 hover:scale-95 transition-transform duration-150 animate-subtle-pulse"
    //             >
    //                 Рассчитать рецепт
    //             </button>
    //         </div>
    //     );
    // }
    //
    // if (status === 'idle' || (status === 'dirty' && !hasEverCalculated)) {
    //     return (
    //         <div className="text-orange-500 font-medium text-sm flex flex-col  relative w-full h-full px-0">
    //             <button
    //                 onClick={handleCalculate}
    //                 className="text-lg  bg-emerald-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-emerald-600 hover:scale-95 transition-transform duration-150 animate-subtle-pulse"
    //             >
    //                 Рассчитать рецепт
    //             </button>
    //         </div>
    //     );
    // }
    //
    // if (status === 'ready') {
    //     return <>{children}</>;
    // }
    //
    // return null;

    return <>

        <button
            onClick={handleCalculate}
            className="text-lg  bg-emerald-500 text-white font-semibold py-2 rounded-xl shadow hover:bg-emerald-600 hover:scale-95 transition-transform duration-150 animate-subtle-pulse"
        >
            Рассчитать рецепт
        </button>
        {children}
    </>;

};
