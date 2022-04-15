import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

import s from "./styles.module.css";
import cn from "classnames";
import { Check, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
    },
  },
});

export const FormCreate = ({ posts, handleCreatePost }) => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState({
    title: "",
    image: "",
    tags: [],
    text: "",
  });

  const handleChange = (prop) => (event) => {
    setCreatePost(() =>
      prop === "tags"
        ? {
            ...createPost,
            [prop]: event.target.value.split(","),
          }
        : {
            ...createPost,
            [prop]: event.target.value,
          }
    );
  };

  const handleSent = (event) => {
    event.preventDefault();
    handleCreatePost(createPost);
    setCreatePost({
      title: "",
      image: "",
      tags: [],
      text: "",
    });
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSent}
        >
          <div className={s.inputs}>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-multiline-flexible">
                Title
              </InputLabel>
              <OutlinedInput
                id="outlined-multiline-flexible"
                label="Title"
                value={createPost.title}
                onChange={handleChange("title")}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-multiline-flexible">
                Image
              </InputLabel>
              <OutlinedInput
                id="outlined-multiline-flexible"
                label="Image"
                value={createPost.image}
                onChange={handleChange("image")}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-multiline-flexible">
                Tags
              </InputLabel>
              <OutlinedInput
                id="outlined-multiline-flexible"
                label="Image"
                value={createPost.tags}
                onChange={handleChange("tags")}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-multiline-flexible">
                Text
              </InputLabel>
              <OutlinedInput
                id="outlined-multiline-static"
                label="Text"
                multiline
                rows={5}
                value={createPost.text}
                onChange={handleChange("text")}
              />
            </FormControl>
          </div>
          <div className={s.btn}>
            <a
              href="#"
              onClick={handleCloseClick}
              style={{ textDecoration: "none" }}
            >
              <Button
                startIcon={<Close />}
                variant="contained"
                style={{ margin: "5px" }}
              >
                Close
              </Button>
            </a>

            <Button
              type="submit"
              startIcon={<Check />}
              variant="contained"
              style={{ margin: "5px" }}
            >
              Sent
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
};
