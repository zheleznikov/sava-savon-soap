import {FC} from "react";

interface RecipeTitleInputProps {
    recipeName: string;
    setRecipeName: (value: string) => void;
}

export const RecipeTitleInput: FC<RecipeTitleInputProps> = ({
                                                                recipeName,
                                                                setRecipeName,
                                                            }) => {

    const isEmpty = recipeName.trim() === "";

    return (
        <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Мой рецепт"
            className={`w-full text-4xl text-center font-semibold min-h-[2.5rem] bg-transparent outline-none transition
                ${isEmpty ? "text-gray-400" : "text-green-700"}`}
        />
    );
};