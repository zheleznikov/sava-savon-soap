import "../index.css";
import {Calculator} from "../pages/Calculator";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./providers/Layout";
import {AboutPage} from "../pages/AboutPage";
import {RecipesPage} from "../pages/RecipesPage";


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


