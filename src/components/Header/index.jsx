import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import { CurrentUserContext } from "../../context/currentUserContext";

import s from "./styles.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[300],
    },
  },
});

export const Header = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="primary" position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={s.user}>
            {currentUser.email && <span>{currentUser.email}</span>}
            {currentUser.name && <span>{currentUser.name}</span>}
          </div>
          <div>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Remix</Button>
            <Button color="inherit">GitHub</Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
