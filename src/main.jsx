import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import DetailsPage from "./DetailsPage.jsx";
import CreatePage from "./CreatePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/details/:taskId",
        element: <DetailsPage />,
    },
    {
        path: "/create",
        element: <CreatePage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);