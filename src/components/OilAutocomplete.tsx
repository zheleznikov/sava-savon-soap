import {FC, useEffect, useRef, useState} from "react";
import {oils, TOil} from "../data/oils2";
import {ChevronDown, ChevronUp, X} from "lucide-react";


type OilAutocompleteProps = {
    selectedOils: TOil[];
    onToggleOil: (oil: TOil) => void;
};

export const OilAutocomplete: FC<OilAutocompleteProps> = ({
                                                              selectedOils,
                                                              onToggleOil
                                                          }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedIds = selectedOils.map(o => o.id);

    const filteredOils = oils.filter(oil => oil.name_rus.toLowerCase().includes(searchTerm.toLowerCase()));

    const listToShow = filteredOils;
    //     .sort((a, b) => {
    //     const aSelected = selectedIds.includes(a.id) ? -1 : 1;
    //     const bSelected = selectedIds.includes(b.id) ? -1 : 1;
    //     return aSelected - bSelected;
    // });


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
            <div className="relative">
                {/* Поле ввода */}
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
                            e.preventDefault();
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
                    focus:border-emerald-400 focus:outline-none focus:ring-0
                        ${isDropdownOpen ? 'rounded-t-xl border-b-0 border-emerald-400' : 'rounded-xl mb-2 border-gray-200'}`}
                />

                {/* Крестик очистки */}
                {searchTerm && (
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault(); // ⛔️ предотвращаем потерю фокуса
                        }}
                        onClick={() => {
                            setSearchTerm('');  // ✅ очищаем поле
                            setDropdownOpen(true); // ✅ оставляем список открытым
                        }}
                        className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                        title="Очистить"
                    >
                        <X size={28} color={"red"}/>
                    </button>
                )}

                {/* Стрелочка */}
                <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                    {isDropdownOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
            </div>

            {/* Выпадающий список */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    // className="backdrop-blur-sm shadow-sm absolute z-50 bg-white border border-t-0 w-full max-h-60 overflow-y-auto shadow rounded-b-xl top-full left-0"
                    className="backdrop-blur-sm shadow-sm absolute z-50 bg-white
    border border-emerald-300 border-t-0
    w-full max-h-60 overflow-y-auto shadow rounded-b-xl top-full left-0"
                >
                    {listToShow.map((oil) => {
                        const isChecked = selectedIds.includes(oil.id);
                        return (
                            <li
                                key={oil.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => onToggleOil(oil)}
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
