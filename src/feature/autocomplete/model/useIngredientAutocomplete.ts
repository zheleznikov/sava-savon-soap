import React, {
    useEffect,
    useRef,
    useState,
    ChangeEvent,
    useMemo,
    useCallback,
    FormEvent
} from "react";
import {TIngredientBase} from "../../../entities/oil/model/ingredient.types";

export const useIngredientAutocomplete = <T extends TIngredientBase>(
    selectedItems: T[],
    allItems: T[],
    onToggleItem: (item: T) => void
) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const ignoreNextBlurReset = useRef(false);

    const selectedIds = useMemo(() => selectedItems.map((i) => i.id), [selectedItems]);
    const [listToShow, setListToShow] = useState<T[]>(allItems);

    const isItemChecked = useCallback(
        (item: T) => selectedIds.includes(item.id),
        [selectedIds]
    );
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

    const sortOnOpenRef = useRef(false);

    const getSortedList = useCallback(() => {
        const filtered = allItems.filter((item) =>
            item.name_rus.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm.trim() === "" && sortOnOpenRef.current) {
            return [...filtered].sort((a, b) => {
                const aSelected = selectedIds.includes(a.id) ? -1 : 1;
                const bSelected = selectedIds.includes(b.id) ? -1 : 1;
                return aSelected - bSelected;
            });
        }

        return filtered;
    }, [searchTerm, allItems, selectedIds]);

    useEffect(() => {
        setListToShow(getSortedList());
    }, [searchTerm, allItems]);



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

                // 🆕 ЯВНО убираем фокус с input
                const input = e.currentTarget as HTMLInputElement;
                input.blur();
            }
        },
        onFormSubmit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // ⛔ не перезагружать страницу
            setDropdownOpen(false);
            setSearchTerm("");
            // ⛳ вручную снять фокус
            const input = containerRef.current?.querySelector("input");
            input?.blur();
        },

        onInputSearchBlur: () => {
            setTimeout(() => {
                setDropdownOpen(false);
                setSearchTerm("");
                sortOnOpenRef.current = false;
            }, 100);
        },

        onInputSearchFocus: () => {
            sortOnOpenRef.current = true;
            setDropdownOpen(true);
            setListToShow(getSortedList());
        },
        onClearSearchButtonMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
        },
        onClearSearchButtonClick: () => {
            setSearchTerm("");
            setDropdownOpen(true);
        },
        onArrowClick: () => {
            const willOpen = !isDropdownOpen;
            setDropdownOpen(willOpen);
            if (willOpen) {
                sortOnOpenRef.current = true;
                setListToShow(getSortedList());
            }
        },
        onListElementMouseDown: (e: React.MouseEvent<HTMLLIElement>) => {
            e.preventDefault();
        },
    };

    return {
        searchTerm,
        isDropdownOpen,
        setSearchTerm,
        setDropdownOpen,
        listToShow,
        dropdownRef,
        containerRef,
        onToggleItem,
        isItemChecked,
        handler
    };
};
