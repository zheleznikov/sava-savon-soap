import "../index.css";
import {Calculator} from "@/pages/calculator";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./providers/Layout";
import {RecipesPage} from "@/pages/recipes";
import {AboutPage} from "@/pages/about";
import {ScrollToTop} from "../shared";
import {ExplanationPage} from "../pages/how-we-calculate/ui/ExplanationPage";


export const App: FC = () => {

    return (
        <Layout>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-we-calculate" element={<ExplanationPage />} />
            </Routes>
        </Layout>
    );
};


