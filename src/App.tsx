import "./index.css";
import {Calculator} from "./components/calculator/Calculator";
import {FC} from "react";
import {SoapRecipeProvider} from "./context/SoapRecipeContext";
import {layout, theme} from "./styles/layout";


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


