import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import DetailsPage from "./DetailsPage.jsx";
import CreatePage from "./CreatePage.jsx";
import EditPage from "./EditPage.jsx";

// Routes for different pages
const router = createBrowserRouter([
    {
        path: "/TasksReact/",
        element: <App/>,
    },
    {
        path: "/TasksReact/details/:taskId",
        element: <DetailsPage/>,
    },
    {
        path: "/TasksReact/create",
        element: <CreatePage/>,
    },
    {
        path: "/TasksReact/edit/:taskId",
        element: <EditPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}/>
);