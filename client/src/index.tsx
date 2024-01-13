import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./interceptors/axios";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#424d56",
      main: "#ffffff",
    },
    secondary: {
      main: "#12122b",
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
