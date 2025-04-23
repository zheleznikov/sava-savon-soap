import {Navbar} from "../../feature/navbar/Navbar";
import {FC, PropsWithChildren} from "react";
import {useTheme} from "./ThemeContext";
import {layout, theme} from "../../shared/styles/layout";


export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { appTheme } = useTheme();

    return (
        <>
            <Navbar />
            <main className={`${layout.page} ${theme[appTheme]}`}>
                <section className={layout.wrapper}>
                    {children}
                </section>
            </main>
        </>
    );
};