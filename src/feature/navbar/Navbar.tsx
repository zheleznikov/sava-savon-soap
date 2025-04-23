import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
    { name: "Калькулятор мыла", href: "/" },
    { name: "Рецепты", href: "/recipes" },
    { name: "О нас", href: "/about" },
];

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();


    return (
        <nav className="bg-white shadow-lg border-b border-pink-100 fixed w-full z-50 shadow-sm">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex justify-between h-16 items-center px-4">
                    {/* Логотип или заголовок */}
                    <div className="text-xl font-bold text-emerald-600">Sava Savon</div>


                    {/*<div className="md:hidden absolute left-[72px] right-[72px] mx-auto text-sm font-medium text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded shadow-sm text-center truncate">*/}
                    {/*    {currentPage}*/}
                    {/*</div>*/}

                    {/* Десктопное меню */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={clsx(
                                    "text-lg font-medium transition hover:text-emerald-600",
                                    location.pathname === link.href ? "text-emerald-600" : "text-gray-700"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Мобильное меню (иконка) */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(true)} className="text-gray-600 hover:text-emerald-600">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Затемнённый фон при открытом меню */}
            <div
                className={clsx(
                    "fixed inset-0 z-51 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
                    menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={() => setMenuOpen(false)}
            />

            {/* Боковая панель на мобилке */}
            <div
                className={clsx(
                    "fixed top-0 left-0 z-[1000] w-64 h-full bg-white shadow-lg border-r border-gray-200 rounded-r-xl transform transition-transform duration-300",
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <span className="text-xl font-bold text-emerald-600">Меню</span>
                    <button onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex flex-col gap-3 px-4 py-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={clsx(
                                "text-xl font-medium transition hover:text-emerald-600",
                                location.pathname === link.href ? "text-emerald-600" : "text-gray-700"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                </nav>

            </div>
        </nav>
    );
};
