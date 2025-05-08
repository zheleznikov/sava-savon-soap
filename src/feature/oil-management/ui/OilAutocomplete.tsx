import {FC} from "react";
import {TOil} from "../../../entities/oil/model/oil.types";
import {ChevronDown, ChevronUp, X} from "lucide-react";
import {useOilAutocomplete} from "../model/useOilAutocompete";
import {OilOptionItem} from "./OilOptionItem";
import {clsx} from "clsx";
import {localization} from "../../../shared/config/localization";
import {oilAutocompleteStyles} from "../styles/OilAutocomplete.styles";
import {useTheme} from "../../../app/providers/ThemeContext";


type OilAutocompleteProps = {
    selectedOils: TOil[];
    onToggleOil: (oil: TOil) => void;
};


export const OilAutocomplete: FC<OilAutocompleteProps> = ({selectedOils, onToggleOil}) => {

    const {
        searchTerm,
        isDropdownOpen,
        listToShow,
        dropdownRef,
        containerRef,
        isOilChecked,
        handler
    } = useOilAutocomplete(selectedOils, onToggleOil);

    const {appTheme} = useTheme();

    const {layout, theme} = oilAutocompleteStyles;
    const styles = theme[appTheme];


    return (
        <section className="relative mb-4" ref={containerRef}>

            <input
                name={"OIL SEARCH"}
                className={clsx(
                    layout.input,
                    styles.input,
                    isDropdownOpen ? "rounded-t-xl border-b-0" : "rounded-xl mb-2"
                )}

                value={searchTerm}
                placeholder={localization.ru.autocomplete_oil.placeholder}

                onChange={handler.onInputSearchChange}
                onKeyDown={handler.onInputSearchKeyDown}
                onBlur={handler.onInputSearchBlur}
                onFocus={handler.onInputSearchFocus}
            />

            {searchTerm &&
                <button
                    name={"CLEAR SEARCH"}
                    type="button"
                    onMouseDown={handler.onClearSearchButtonMouseDown}
                    onClick={handler.onClearSearchButtonClick}
                    className={clsx(layout.clear, styles.clear)}
                >
                    <span className="block sm:hidden"><X size={32} color="red"/></span>
                    <span className="hidden sm:block"><X size={24} color="red"/></span>
                </button>
            }

            <button
                name={"OPEN/CLOSE LIST"}
                type="button"
                onClick={handler.onArrowClick}
                className={layout.arrow}
            >
                <span className="block sm:hidden">
                    {
                        isDropdownOpen
                            ? <ChevronUp size={32} color={"gray"}/>
                            : <ChevronDown size={32} color={"gray"}/>
                    }
                </span>

                <span className="hidden sm:block">
                        {
                            isDropdownOpen
                                ? <ChevronUp size={24} color={"gray"}/>
                                : <ChevronDown size={24} color={"gray"}/>
                        }
                </span>
            </button>


            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className={clsx(layout.dropdown, styles.dropdown)}
                >
                    {listToShow.map(oil => <OilOptionItem
                            key={oil.id}
                            onClick={() => onToggleOil(oil)}
                            onMouseDown={handler.onListElementMouseDown}
                            isChecked={isOilChecked(oil)}
                            oil={oil}
                        />
                    )}
                </ul>
            )}

        </section>
    );
};



