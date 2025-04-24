import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import {navbar} from "../../shared/styles/navbar";
import {navLinks} from "../../app/config/links";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const location = useLocation();

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

    return (
        <>
            <nav
                className={clsx(
                    navbar.base,
                    navbar.light.style,
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className={navbar.container}>
                    <div className={navbar.header}>
                        <div className={navbar.light.logo}>Sava Savon</div>

                        <div className={navbar.light.desktop_menu}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name_rus}
                                    to={link.href}
                                    className={clsx(
                                        navbar.light.desktop_link,
                                        location.pathname === link.href
                                            ? navbar.light.desktop_link_active
                                            : navbar.light.desktop_link_inactive
                                    )}
                                >
                                    {link.name_rus}
                                </Link>
                            ))}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(true)}
                                className={navbar.light.mobile_menu_button}
                            >
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Затемнение при открытом меню */}
            <div
                className={clsx(
                    navbar.light.mobile_overlay,
                    menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={() => setMenuOpen(false)}
            />

            {/* Выезжающее меню */}
            <div
                className={clsx(
                    navbar.sidebar.base,
                    navbar.light.sidebar_style,
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className={navbar.light.sidebar_header}>
                    <span className={navbar.light.sidebar_title}>Меню</span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className={navbar.light.sidebar_close_button}
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className={navbar.light.sidebar_nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name_rus}
                            to={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={clsx(
                                navbar.light.sidebar_link,
                                location.pathname === link.href
                                    ? navbar.light.sidebar_link_active
                                    : navbar.light.sidebar_link_inactive
                            )}
                        >
                            {link.name_rus}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};
