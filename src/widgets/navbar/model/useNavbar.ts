import { useEffect, useRef, useState } from "react";

export const useNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const lastScrollY = useRef(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const openMenu = () => {
        setMenuVisible(true);
        requestAnimationFrame(() => setMenuOpen(true));
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setTimeout(() => setMenuVisible(false), 300);
    };

    // Скрытие navbar при скролле
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Свайп для закрытия сайдбара
    useEffect(() => {
        if (!menuVisible) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const deltaX = touchStartX.current - touchEndX.current;
            if (deltaX > 50) closeMenu();
        };

        const sidebar = document.getElementById("mobile-sidebar");
        sidebar?.addEventListener("touchstart", handleTouchStart);
        sidebar?.addEventListener("touchmove", handleTouchMove);
        sidebar?.addEventListener("touchend", handleTouchEnd);

        return () => {
            sidebar?.removeEventListener("touchstart", handleTouchStart);
            sidebar?.removeEventListener("touchmove", handleTouchMove);
            sidebar?.removeEventListener("touchend", handleTouchEnd);
        };
    }, [menuVisible]);

    return {
        menuOpen,
        menuVisible,
        isVisible,
        openMenu,
        closeMenu,
    };
};
