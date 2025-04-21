import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {oils, TOil} from "../data/oils2";

export const useOilAutocomplete = (selectedOils: TOil[], onToggleOil: (oil: TOil) => void) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const selectedIds = selectedOils.map((o) => o.id);
    const [listToShow, setListToShow] = useState(oils);

    const isOilChecked = (oil: TOil) => selectedIds.includes(oil.id);


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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const filtered = oils.filter((oil) =>
            oil.name_rus.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const updated = [...filtered];

        if (searchTerm.trim() === "") {
            updated.sort((a, b) => {
                const aSelected = selectedIds.includes(a.id) ? -1 : 1;
                const bSelected = selectedIds.includes(b.id) ? -1 : 1;
                return aSelected - bSelected;
            });
        }

        setListToShow(updated);
    }, [searchTerm, selectedOils]);

    const handler = {
        onInputSearchChange: (e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.currentTarget.value);
            setDropdownOpen(true);
        },

        onInputSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === "Done") {
                e.preventDefault();
                setDropdownOpen(false);
                setSearchTerm("");
            }
        },

        onInputSearchBlur: () => {
            setTimeout(() => {
                setDropdownOpen(false);
                setSearchTerm("");
            }, 100);
        },

        onInputSearchFocus: () => {
            setDropdownOpen(true)
        },

        onClearSearchButtonMouseDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // предотвращаем потерю фокуса
            e.preventDefault();
        },

        onClearSearchButtonClick: () => {
            setSearchTerm("");
            setDropdownOpen(true);
        },

        onArrowClick: () => {
            setDropdownOpen((prev) => !prev)
        },

        onListElementMouseDown: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            e.preventDefault()
        }
    };

    return {
        searchTerm,
        isDropdownOpen,
        setSearchTerm,
        setDropdownOpen,
        listToShow,
        dropdownRef,
        containerRef,
        onToggleOil,
        isOilChecked,
        handler
    };
};
