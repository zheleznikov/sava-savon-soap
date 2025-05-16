import {ChevronDown, ChevronUp, X} from "lucide-react";
import {clsx} from "clsx";
import {useTheme} from "../../../app/providers/ThemeContext";
import {TIngredientBase} from "../../../entities/oil/model/ingredient.types";
import {useIngredientAutocomplete} from "../model/useIngredientAutocomplete";
import {IngredientOptionItem} from "./IngredientOptionItem";
import {autocompleteStyles} from "../styles/Autocomplete.styles";


type IngredientAutocompleteProps<T extends TIngredientBase> = {
    selectedItems: T[];
    allItems: T[];
    onToggleItem: (item: T) => void;
    placeholder?: string
};

export const IngredientAutocomplete = <T extends TIngredientBase>({
    selectedItems,
    allItems,
    onToggleItem,
    placeholder
}: IngredientAutocompleteProps<T>) => {
    const {
        searchTerm,
        isDropdownOpen,
        listToShow,
        dropdownRef,
        containerRef,
        isItemChecked,
        handler,
    } = useIngredientAutocomplete<T>(selectedItems, allItems, onToggleItem);

    const { appTheme } = useTheme();
    const { layout, theme } = autocompleteStyles;
    const styles = theme[appTheme];

    return (
        <section className="relative mb-0 sm:mb-4" ref={containerRef}>
            <form
                onSubmit={handler.onFormSubmit}
            >
                <input
                    className={clsx(
                        layout.input,
                        styles.input,
                        isDropdownOpen ? "rounded-t-xl border-b-0" : "rounded-xl mb-2"
                    )}
                    value={searchTerm}
                    placeholder={placeholder}
                    onChange={handler.onInputSearchChange}
                    // ❌ больше не нужен
                    // onKeyDown={handler.onInputSearchKeyDown}
                    onBlur={handler.onInputSearchBlur}
                    onFocus={handler.onInputSearchFocus}
                />
            </form>

            {searchTerm && (
                <button
                    type="button"
                    onMouseDown={handler.onClearSearchButtonMouseDown}
                    onClick={handler.onClearSearchButtonClick}
                    className={clsx(layout.clear, styles.clear)}
                >
                    <X size={24} color="red" />
                </button>
            )}

            <button
                type="button"
                onClick={handler.onArrowClick}
                className={layout.arrow}
            >
                {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {isDropdownOpen && (
                <ul ref={dropdownRef} className={clsx(layout.dropdown, styles.dropdown)}>
                    {listToShow.map((item) => (
                        <IngredientOptionItem
                            key={item.id}
                            item={item}
                            onClick={() => onToggleItem(item)}
                            onMouseDown={handler.onListElementMouseDown}
                            isChecked={isItemChecked(item)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
};
