import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import DetailsPage from "./DetailsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/details/:taskId",
        element: <DetailsPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);