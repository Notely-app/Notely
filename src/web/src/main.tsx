import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home.tsx";
import App from "@/App.tsx";
import Auth from "@/pages/Auth.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<App />}>
                <Route path={"/"} element={<Home />} />
                <Route path={"/auth"} element={<Auth />} />
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
