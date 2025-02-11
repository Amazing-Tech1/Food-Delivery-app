import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <StoreContextProvider>
                <App />
            </StoreContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
)
