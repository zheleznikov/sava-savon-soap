import React, {FC} from "react";
import {TOil} from "../data/oils2";
import {clsx} from "clsx";
import {autocomplete} from "../styles/layout";

interface Props {
    oil: TOil,
    isChecked: boolean,
    onClick: () => void,
    onMouseDown: React.MouseEventHandler<HTMLLIElement>
}
export const OilOptionItem: FC<Props> = ({oil, isChecked, onClick, onMouseDown}) => {

    const listItemClass = clsx(
        autocomplete.layout.dropdown_item,
        autocomplete.theme.light.dropdown_item,
        isChecked && autocomplete.theme.light.dropdown_item_checked
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
                className="form-checkbox text-emerald-500 accent-emerald-500"
            />
            <span>{oil.name_rus}</span>
        </li>
    );
};