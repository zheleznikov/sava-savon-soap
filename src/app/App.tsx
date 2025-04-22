import "../index.css";
import {Calculator} from "../pages/Calculator";
import {FC} from "react";
import {layout, theme} from "../shared/styles/layout";
import {useTheme} from "./providers/ThemeContext";


export const App: FC = () => {

    const {appTheme} = useTheme();

    return (
        <main className={`${layout.page} ${theme[appTheme]}`}>

            <section className={layout.wrapper}>

                <Calculator/>
            </section>
        </main>
    );
};


