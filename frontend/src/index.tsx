import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainAppPage from "./pages/MainAppPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>,
        errorElement: <NotFoundPage/>,
    },
    {
        path: '/mainapp',
        element: <MainAppPage/>,
        errorElement: <NotFoundPage/>,
    }
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
