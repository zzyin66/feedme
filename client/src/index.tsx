import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./interceptors/axios";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#ffffff",
      main: "#12122b",
    },
    secondary: {
      main: "#ffffff",
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
