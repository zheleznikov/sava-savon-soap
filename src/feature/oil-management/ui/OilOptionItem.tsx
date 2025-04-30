import React, {FC} from "react";
import {TOil} from "../../../entities/oil/model/oil.types";
import {clsx} from "clsx";
import {oilAutocompleteStyles} from "../styles/OilAutocomplete.styles";
import {useTheme} from "../../../app/providers/ThemeContext";

interface Props {
    oil: TOil,
    isChecked: boolean,
    onClick: () => void,
    onMouseDown: React.MouseEventHandler<HTMLLIElement>
}
export const OilOptionItem: FC<Props> = ({oil, isChecked, onClick, onMouseDown}) => {

    const {appTheme} = useTheme();

    const {layout, theme} = oilAutocompleteStyles;
    const styles = theme[appTheme];

    const listItemClass = clsx(
        layout.dropdownItem,
        styles.dropdownItem,
        isChecked && styles.dropdownItemChecked
    );


    return (
        <li
            key={oil.id}
            onMouseDown={onMouseDown}
            onClick={onClick}
            className={listItemClass}
        >
            <input
                type="checkbox"
                checked={isChecked}
                readOnly
                className={styles.dropdownCheckbox}
            />
            <span>{oil.name_rus}</span>
        </li>
    );
};