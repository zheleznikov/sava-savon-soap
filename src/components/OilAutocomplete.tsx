import React, {useEffect, useRef, useState} from "react";
import type {Oil} from "../data/oils";
import {oils} from "../data/oils";

interface OilAutocompleteProps {
    value: Oil | null;
    onChange: (oil: Oil | null) => void;

}

export const OilAutocomplete = ({value, onChange}: OilAutocompleteProps) => {

    const [searchTerm, setSearchTerm] = useState(value?.name || '');
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const visibleOils = oils.filter(oil => !oil.hide);

    const filteredOils = visibleOils.filter(oil =>
        oil.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listToShow = filteredOils.length > 0 ? filteredOils : visibleOils;

    const handleSelect = (oil: Oil) => {
        onChange(oil);
        setSearchTerm(oil.name);
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

    useEffect(() => {
        if (value) {
            setSearchTerm(value.name);
        } else {
            setSearchTerm('');
        }
    }, [value]);


    return (
        <div className="relative w-full">
            {/* Лупа */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
            </div>

            {/* Поле ввода */}
            <input
                type="text"
                value={searchTerm}
                placeholder="Выберите или начните вводить название масла"
                title="Начните вводить название масла"
                onInput={(e) => {
                    setSearchTerm(e.currentTarget.value);
                    setDropdownOpen(true);
                    if (value && e.currentTarget.value !== value.name) {
                        onChange(null);
                    }
                }}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
                onKeyDown={handleKeyDown}
                className="w-full border rounded px-2 py-1 pl-8 pr-8 focus:ring-2 focus:ring-purple-400 transition"
            />

            {/* Стрелочка */}
            <div
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onMouseDown={(e) => {
                    e.preventDefault();
                    setDropdownOpen((prev) => !prev);
                }}
                title="Открыть список масел"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Выпадающий список */}
            {isDropdownOpen && (
                <ul
                    ref={dropdownRef}
                    className="absolute z-9999 bg-white border w-full max-h-48 overflow-y-auto shadow rounded mt-1"
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
