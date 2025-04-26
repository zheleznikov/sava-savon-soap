import "../index.css";
import {Calculator} from "../pages/Calculator";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./providers/Layout";
import {RecipesPage} from "../pages/RecipesPage";
import {AboutPage} from "@/pages/about";


export const App: FC = () => {


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Layout>
    );
};


