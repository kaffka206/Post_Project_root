import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[300],
    },
  },
});

export const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            © Footer
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
