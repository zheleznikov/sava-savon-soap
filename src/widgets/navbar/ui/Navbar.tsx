import {Link, useLocation} from "react-router-dom";
import clsx from "clsx";
import {Menu, X} from "lucide-react";

import { useNavbar } from "@/widgets/navbar";
import { navbar } from "@/widgets/navbar";
import { navLinks } from "@/widgets/navbar";
import { localization } from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {ThemeHandler} from "@/feature/theme-handler/ThemeHandler";


export const Navbar = () => {
    const { menuOpen, menuVisible, isVisible, openMenu, closeMenu } = useNavbar();
    const location = useLocation();

    const { appTheme } = useTheme();

    const styles = navbar[appTheme];

    return (
        <>
            {/* Navbar отображается только если не открыт сайдбар */}
            {!menuVisible && (
                <nav
                    className={clsx(
                        navbar.base,
                        styles.style,
                        isVisible ? "translate-y-0" : "-translate-y-full"
                    )}
                >
                    <div className={navbar.container}>
                        <div className={navbar.header}>
                            <div className={clsx(styles.logo, "hidden md:block")}>{localization.ru.logo}</div>

                            <div className={clsx(styles.desktop_menu, "items-center gap-4")}>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name_rus}
                                        to={link.href}
                                        className={clsx(
                                            styles.desktop_link,
                                            location.pathname === link.href
                                                ? styles.desktop_link_active
                                                : styles.desktop_link_inactive
                                        )}
                                    >
                                        {link.name_rus}
                                    </Link>
                                ))}
                                <ThemeHandler />
                            </div>


                            <div className="md:hidden flex items-center justify-between w-full px-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={openMenu}
                                        className={styles.mobile_menu_button}
                                    >
                                        <Menu size={28} />
                                    </button>
                                    <div className={styles.logo}>{localization.ru.logo}</div>
                                </div>

                                <ThemeHandler />
                            </div>


                        </div>
                    </div>
                </nav>
            )}

            {/* Overlay и Sidebar */}
            {menuVisible && (
                <>
                    <div
                        className={clsx(
                            styles.mobile_overlay,
                            menuOpen ? "opacity-100" : "opacity-0"
                        )}
                        onClick={closeMenu}
                    />

                    <div
                        id="mobile-sidebar"
                        className={clsx(
                            navbar.sidebar.base,
                            styles.sidebar_style,
                            menuOpen ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        {/* Хедер сайдбара */}
                        <div className={styles.sidebar_header}>
                            <span className={styles.sidebar_title}>{localization.ru.logo}</span>
                            <button
                                onClick={closeMenu}
                                className={styles.sidebar_close_button}
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Навигация */}
                        <nav className={styles.sidebar_nav}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name_rus}
                                    to={link.href}
                                    onClick={closeMenu} // 👈 оставляем только на Link!
                                    className={clsx(
                                        styles.sidebar_link,
                                        location.pathname === link.href
                                            ? styles.sidebar_link_active
                                            : styles.sidebar_link_inactive
                                    )}
                                >
                                    {link.name_rus}
                                </Link>
                            ))}


                        </nav>
                    </div>
                </>
            )}
        </>
    );
};