import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.jsx";
import "./index.css";
import { Home } from "./Components/Home";
import { EventsList } from "./Components/EventsList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/EventsList/:city/:attraction",
        element: <EventsList />,
    },
    {
        path: "/EventsList/:city",
        element: <EventsList />,
    },
    {
        path: "/AttractionsList/:attraction",
        element: <EventsList />,
    },
    { path: "/Login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
