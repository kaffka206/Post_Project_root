import React from "react";
// import s from "./styles.module.css";
import cn from "classnames";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <a href="#" onClick={handleBackClick}>
        <IconButton aria-label="back">
          <ArrowBack />
        </IconButton>
      </a>
      <h1 className={cn("text_not_found")}>
        Ошибка 404
        <br />
        Страница не найдена
      </h1>
    </>
  );
};
