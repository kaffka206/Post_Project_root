import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
    },
  },
});

const _Button = ({ text, icon }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        color="primary"
        variant="contained"
        startIcon={icon && icon === "Edit" ? <Edit /> : <Add />}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default _Button;
