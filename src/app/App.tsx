import "../index.css";
import {Calculator} from "../pages/Calculator";
import {FC} from "react";
import {SoapRecipeProvider} from "./providers/SoapRecipeContext";
import {layout, theme} from "../shared/styles/layout";


export const App: FC = () => {
    return (
        <SoapRecipeProvider>
            <main className={`${layout.page} ${theme.light}`}>
                <section className={layout.wrapper}>
                    <Calculator />
                </section>
            </main>
        </SoapRecipeProvider>
    );
};


