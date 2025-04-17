import { useEffect, useRef, useState } from "react";
import { TOil, oils } from "../data/oils2";
import { ChevronDown, ChevronUp } from "lucide-react"; // иконки

interface OilAutocompleteProps {
    onToggle: (oil: TOil) => void;
    selectedOils: TOil[];
}

export const OilAutocomplete = ({ onToggle, selectedOils }: OilAutocompleteProps) => {
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
        <div className="relative w-full z-50" ref={containerRef}>
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
                    onFocus={() => setDropdownOpen(true)}
                    className="w-full border rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-400 transition"
                />

                {/* Стрелочка */}
                <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                    {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Выпадающий список */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto shadow rounded mt-1"
                >

                    {listToShow.map((oil) => {
                        const isChecked = selectedIds.includes(oil.id);
                        return (
                            <li
                                key={oil.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => onToggle(oil)}
                                className={`flex items-center gap-2 px-2 py-1 cursor-pointer transition ${
                                    isChecked ? "bg-purple-100 font-medium" : ""
                                } hover:bg-purple-50`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    readOnly
                                    className="form-checkbox text-purple-500 accent-purple-500"
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
