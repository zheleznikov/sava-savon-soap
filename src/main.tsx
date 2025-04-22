import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './app/App.tsx'
import {ThemeProvider} from "./app/providers/ThemeContext";
import {SoapRecipeProvider} from "./app/providers/SoapRecipeContext";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <SoapRecipeProvider>
                <App/>
            </SoapRecipeProvider>
        </ThemeProvider>
    </StrictMode>,
)
