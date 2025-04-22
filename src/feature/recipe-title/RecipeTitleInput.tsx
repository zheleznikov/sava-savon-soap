import {useSoapRecipe} from "../recipe-calculation/model/useSoapRecipe";

export const RecipeTitleInput = () => {
    const { recipeName, setRecipeName } = useSoapRecipe();

    const isEmpty = recipeName.trim() === "";

    return (
        <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Мой рецепт"
            className={`w-full text-2xl text-center font-semibold min-h-[2.5rem] bg-transparent outline-none transition
                ${isEmpty ? "text-gray-400" : "text-green-700"}`}
        />
    );
};