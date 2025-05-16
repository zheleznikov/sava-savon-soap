import {Plus} from "lucide-react";
import {clsx} from "clsx";
import {useTheme} from "../../../app/providers/ThemeContext";
import {TIngredientBase} from "../../../entities/oil/model/ingredient.types";
import {useIngredientAutocomplete} from "../model/useIngredientAutocomplete";
import {autocompleteStyles} from "../styles/Autocomplete.styles";
import React, {useRef} from "react";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";


type IngredientAutocompleteProps<T extends TIngredientBase> = {
    selectedItems: T[];
    allItems: T[];
    onToggleItem: (item: T) => void;
    placeholder?: string
};

export const IngredientAdd = <T extends TIngredientBase>({
    selectedItems,
    allItems,
    onToggleItem,
    placeholder
}: IngredientAutocompleteProps<T>) => {
    const {
        searchTerm,
        containerRef,
        handler,
    } = useIngredientAutocomplete<T>(selectedItems, allItems, onToggleItem);

    const {appTheme} = useTheme();
    const {layout, theme} = autocompleteStyles;
    const styles = theme[appTheme];

    const inputRef = useRef<HTMLInputElement>(null);
    const wasJustSubmitted = useRef(false);

    const handleAddNewItem = () => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return;

        const maxId = [...selectedItems, ...allItems].reduce(
            (max, item) => Math.max(max, item.id),
            0
        );

        const newItem: TCustom = {
            id: maxId + 1,
            name_rus: trimmed,
            name_eng: trimmed,
            gram: 0,
            percent: 0,
            inputType: InputType.Gram

        };

        onToggleItem(newItem as unknown as T);
        handler.onClearSearchButtonClick(); // очищаем ввод
        wasJustSubmitted.current = true;
        inputRef.current?.blur();
    };


    return (
        <section className="relative mb-0 sm:mb-4" ref={containerRef}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddNewItem();
                }}
            >
                <input
                    ref={inputRef}
                    className={clsx(
                        layout.input,
                        styles.input,
                        "rounded-xl mb-2"
                    )}
                    value={searchTerm}
                    placeholder={placeholder}
                    onChange={handler.onInputSearchChange}
                    onBlur={() => {
                        // ✅ iPhone "Готово"
                        if (wasJustSubmitted.current) {
                            wasJustSubmitted.current = false; // 🔁 сбросить
                            return;
                        }

                        if (searchTerm.trim()) {
                            handleAddNewItem(); // ✅ Только если не было вручную
                        }
                    }}
                />
            </form>

            <button
                type="button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleAddNewItem();
                }}
                className={clsx(layout.arrow, styles.clear)}
            >
                <Plus size={24} color="green"/>
            </button>

        </section>
    );
};
