import React, {useEffect, useRef, useState} from "react";
import type {Oil} from "../data/oils";
import {oils} from "../data/oils";
import {TSelectedOil} from "../types/TSelectedOil";

interface OilAutocompleteProps {
    onChange: (oil: TSelectedOil | null) => void;
    selectedOils: TSelectedOil[];
}

export const OilAutocomplete = ({onChange, selectedOils}: OilAutocompleteProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640); // sm breakpoint
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // 🔎 Уже выбранные названия масел
    const selectedNames = selectedOils.map(o => o.oil!.name);

    // 🎯 Отфильтрованный список
    const visibleOils = oils.filter(oil => !oil.hide && !selectedNames.includes(oil.name));

    const filteredOils = visibleOils.filter(oil =>
        oil.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listToShow = filteredOils.length > 0 ? filteredOils : visibleOils;

    const handleSelect = (selectedOil: Oil) => {
        onChange({oil: selectedOil, weight: 0, percent: 0});
        setSearchTerm(''); // очищаем инпут
        setDropdownOpen(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isDropdownOpen) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < listToShow.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : listToShow.length - 1));
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0) {
                handleSelect(listToShow[highlightedIndex]);
            }
        }
    };

    useEffect(() => {
        if (
            dropdownRef.current &&
            highlightedIndex >= 0 &&
            dropdownRef.current.children[highlightedIndex]
        ) {
            const item = dropdownRef.current.children[highlightedIndex] as HTMLElement;
            item.scrollIntoView({block: "nearest"});
        }
    }, [highlightedIndex]);

    return (
        <div className="relative w-full">
            {/* Инпут */}
            <input
                type="text"
                value={searchTerm}
                placeholder="Выберите или начните вводить название масла"
                onInput={(e) => {
                    setSearchTerm(e.currentTarget.value);
                    setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
                onKeyDown={handleKeyDown}
                className="w-full border rounded px-2 py-1 pl-8 pr-8 focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* Выпадающий список */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className={`absolute z-50 bg-white border w-full max-h-48 overflow-y-auto shadow rounded mt-1 
      ${isMobile ? 'bottom-full mb-1' : 'top-full mt-1'}`}
                    style={{ maxHeight: '12rem' }}
                >
                    {listToShow.map((oil, index) => (
                        <li
                            key={oil.name}
                            onMouseDown={() => handleSelect(oil)}
                            className={`px-2 py-1 text-left cursor-pointer ${
                                index === highlightedIndex ? "bg-purple-200" : "hover:bg-purple-100"
                            }`}
                        >
                            {oil.name}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

