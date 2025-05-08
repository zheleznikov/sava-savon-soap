import { FC } from "react";
import clsx from "clsx";
import {TIngredientBase} from "../../../entities/oil/model/ingredient.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {autocompleteStyles} from "../styles/Autocomplete.styles";


interface Props<T extends TIngredientBase> {
    item: T;
    isChecked: boolean;
    onClick: () => void;
    onMouseDown: React.MouseEventHandler<HTMLLIElement>;
}

export const IngredientOptionItem = <T extends TIngredientBase>({
    item,
    isChecked,
    onClick,
    onMouseDown,
}: Props<T>) => {
    const { appTheme } = useTheme();
    const { layout, theme } = autocompleteStyles;
    const styles = theme[appTheme];

    const listItemClass = clsx(
        layout.dropdownItem,
        styles.dropdownItem,
        isChecked && styles.dropdownItemChecked
    );

    return (
        <li key={item.id} onMouseDown={onMouseDown} onClick={onClick} className={listItemClass}>
            <input
                type="checkbox"
                checked={isChecked}
                readOnly
                className={styles.dropdownCheckbox}
            />
            <span>{item.name_rus}</span>
        </li>
    );
};
