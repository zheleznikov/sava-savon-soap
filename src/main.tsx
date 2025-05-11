import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "./app/providers/ThemeContext";
import {BrowserRouter} from "react-router-dom";
import {App} from "./app/App";

import {registerSW} from 'virtual:pwa-register';
import {Provider} from "react-redux";
import { store } from '@/app/store';

registerSW()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                        <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
