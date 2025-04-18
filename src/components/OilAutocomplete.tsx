import {FC, useEffect, useRef, useState} from "react";
import {oils} from "../data/oils2";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useSoapRecipe} from "../context/useSoapRecipe"; // иконки


export const OilAutocomplete: FC = () => {

    const {selectedOils, handleToggleOil} = useSoapRecipe();


    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedIds = selectedOils.map(o => o.id);

    const filteredOils = oils.filter(oil =>
        oil.name_rus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listToShow = filteredOils.sort((a, b) => {
        const aSelected = selectedIds.includes(a.id) ? -1 : 1;
        const bSelected = selectedIds.includes(b.id) ? -1 : 1;
        return aSelected - bSelected;
    });

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full z-50 mb-4" ref={containerRef}>
            {/* Обёртка для input + стрелочка */}
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Начните вводить название масла"
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value);
                        setDropdownOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Done") {
                            e.preventDefault(); // чтобы не было сабмита формы
                            setDropdownOpen(false);
                            setSearchTerm('');
                        }
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setDropdownOpen(false);
                            setSearchTerm('');
                        }, 100);
                    }}
                    onFocus={() => setDropdownOpen(true)}
                    className={`w-full border border-gray-200 p-2 pt-4 pb-4 bg-white/70 backdrop-blur-sm shadow-sm
  ${isDropdownOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl mb-2'}`}

                />

                {/* Стрелочка */}
                <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="absolute right-3 top-8 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                    {isDropdownOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
            </div>

            {/* Выпадающий список */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className="backdrop-blur-sm shadow-sm absolute z-50 bg-white border border-t-0 w-full max-h-60 overflow-y-auto shadow rounded-b-xl top-full left-0"

                >

                    {listToShow.map((oil) => {
                        const isChecked = selectedIds.includes(oil.id);
                        return (
                            <li
                                key={oil.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    handleToggleOil(oil);

                                }}
                                className={`flex items-center gap-2 px-2 py-1 cursor-pointer transition ${
                                    isChecked ? "bg-emerald-100 font-medium" : ""
                                } hover:bg-emerald-50`}
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
                    })}
                </ul>
            )}
        </div>
    );
};
