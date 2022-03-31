import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import AppContext from "../context";
import { Toaster } from 'react-hot-toast';
import "../styles/style.scss";

const theme = createTheme({
  typography: {
    fontSize: 24
  }
})
function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({});
  return <AppContext.Provider value={[state, setState]}>
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" toastOptions={{
        loading: {
          style: {
            background: "#ffc107",
            color: "#fff",
            fontSize: "1.8rem"
          },
          icon: "⚠️",
          duration: 4000,
        },
        error: {
          style: {
            background: "#dc3545",
            color: "#fff",
            fontSize: "1.8rem"
          },
          duration: 4000,
        },
        success: {
          style: {
            background: "#28a745",
            color: "#fff",
            fontSize: "1.8rem"
          },
          duration: 4000,
        },
        style: {
          fontSize: "1.8rem"
        },
      }} />
      <Component {...pageProps} />
    </ThemeProvider>
  </AppContext.Provider>
}

export default MyApp
