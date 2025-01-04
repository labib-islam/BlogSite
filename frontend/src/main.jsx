import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ChakraProvider, Theme } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./user/shared/contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
