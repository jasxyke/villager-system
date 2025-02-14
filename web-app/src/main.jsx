import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { SettingsProvider } from "./contexts/SettingsContext";
import { AmenitiesProvider } from "./contexts/AmenitiesContext";
import { AlertProvider } from "./contexts/AlertBox/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <AmenitiesProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </AmenitiesProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
