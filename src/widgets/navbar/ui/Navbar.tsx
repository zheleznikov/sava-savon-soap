import {Link, useLocation} from "react-router-dom";
import clsx from "clsx";
import {Menu, X} from "lucide-react";

import {navbar, navLinks, useNavbar} from "@/widgets/navbar";
import {useTheme} from "@/app/providers/ThemeContext";
import {ThemeHandler} from "@/feature/theme-handler/ThemeHandler";
import logo_white from "@/assets/logo4.svg";
import logo_black from "@/assets/logo-black.svg";


export const Navbar = () => {
    const location = useLocation();

    const { menuOpen, menuVisible, isVisible, openMenu, closeMenu } = useNavbar();
    const { appTheme } = useTheme();

    const s = navbar[appTheme];

    const logo = appTheme === "dark" ? logo_black : logo_white;

    return (
        <>
            {/* Navbar отображается только если не открыт сайдбар */}
            {!menuVisible && (
                <nav
                    className={clsx(
                        navbar.base,
                        s.style,
                        isVisible ? "translate-y-0" : "-translate-y-full"
                    )}
                >
                    <div className={navbar.container}>
                        <div className={navbar.header}>
                            <div className={clsx(s.logo, s.logo_hidden)}>
                                {/*{localization.ru.logo}*/}
                                <img
                                    src={logo}
                                    alt="Sava Savon Logo"
                                    className="h-12 w-auto"
                                />
                            </div>

                            <div className={clsx(s.desktop_menu)}>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name_rus}
                                        to={link.href}
                                        className={clsx(
                                            s.desktop_link,
                                            location.pathname === link.href
                                                ? s.desktop_link_active
                                                : s.desktop_link_inactive
                                        )}
                                    >
                                        {link.name_rus}
                                    </Link>
                                ))}
                                <ThemeHandler />
                            </div>


                            <div className={s.mobile_wrapper}>
                                <div className={s.mobile_inner}>
                                    <button
                                        onClick={openMenu}
                                        className={s.mobile_menu_button}
                                    >
                                        <Menu size={28} />
                                    </button>
                                    <div className={s.logo}>
                                        <img
                                            src={logo}
                                            alt="Sava Savon Logo"
                                            className="h-8 w-auto"
                                        />
                                    </div>
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
                            s.mobile_overlay,
                            menuOpen ? "opacity-100" : "opacity-0"
                        )}
                        onClick={closeMenu}
                    />

                    <div
                        id="mobile-sidebar"
                        className={clsx(
                            navbar.sidebar.base,
                            s.sidebar_style,
                            menuOpen ? "translate-x-0" : "-translate-x-full"
                        )}
                    >

                        <div className={s.sidebar_header}>
                            <img
                                src={logo}
                                alt="Sava Savon Logo"
                                className="h-12 w-auto"
                            />
                            <button
                                onClick={closeMenu}
                                className={s.sidebar_close_button}
                            >
                                <X size={28} />
                            </button>
                        </div>


                        <nav className={s.sidebar_nav}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name_rus}
                                    to={link.href}
                                    onClick={closeMenu}
                                    className={clsx(
                                        s.sidebar_link,
                                        location.pathname === link.href
                                            ? s.sidebar_link_active
                                            : s.sidebar_link_inactive
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