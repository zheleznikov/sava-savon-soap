import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "./app/providers/ThemeContext";
import {SoapRecipeProvider} from "./app/providers/SoapRecipeContext";
import {BrowserRouter} from "react-router-dom";
import {App} from "./app/App";

import { registerSW } from 'virtual:pwa-register';

registerSW()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <SoapRecipeProvider>
                    <App/>
                </SoapRecipeProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
