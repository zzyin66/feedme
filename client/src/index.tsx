import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#ffffff",
      main: "#839cb5",
    },
    secondary: {
      contrastText: "#031c30",
      main: "#b1e1e9",
    },
    warning: {
      main: "#fab243",
    },
    error: {
      main: "#e02130",
    },
  },
  spacing: 2,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
