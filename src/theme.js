import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h4: {
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1.1rem",
      color: "black",
    },
  },
});

export default theme;
