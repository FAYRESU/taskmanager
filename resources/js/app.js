import "./app.css"; // เรียก Tailwind CSS
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = document.getElementById("app");

if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
