import React, { useContext, useState } from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Favorite, ArrowBack } from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import cn from "classnames";
import s from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";

dayjs.locale("ru");

export const SeePost = ({
  onPostLike,
  _id,
  likes,
  image,
  title,
  text,
  created_at,
  author,
  tags,
}) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const isLiked = likes && likes.some((id) => id === currentUser._id);
  const dataFormated = dayjs(created_at).format("DD MMMM YYYY, dddd");

  const handleLikeClick = () => {
    onPostLike({ _id, likes });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <a href="#" className={s.back} onClick={handleBackClick}>
        <IconButton aria-label="back">
          <ArrowBack />
        </IconButton>
      </a>

      <div className={s.author_post}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={author?.avatar && author?.avatar} aria-label="recipe">
            {!author?.avatar && author?.name.slice(0, 1)}
          </Avatar>
          <Typography
            style={{ color: "rgb(246, 143, 70)", paddingLeft: "20px" }}
          >
            {author?.name}
          </Typography>
        </div>
        <div>
          <Typography style={{ color: "rgb(246, 143, 70)" }}>
            {author?.email}
          </Typography>
          <Typography style={{ color: "rgb(246, 143, 70)" }}>
            {dataFormated}
          </Typography>
        </div>
      </div>

      <div className={s.text_post}>
        <img
          src={image}
          alt={`Изображение поста ${author?.name}`}
          className={s.img}
        />

        <Typography style={{ color: "rgb(246, 143, 70)", marginLeft: "20px" }}>
          {text}
        </Typography>
      </div>

      <div className={s.end_post}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            {isLiked ? <Favorite sx={{ fill: "red" }} /> : <Favorite />}
          </IconButton>
          <p>{likes?.length}</p>
        </div>

        <div className={s.tags_post}>
          {tags?.map((...tag) => {
            for (let val of tag) {
              if (typeof val === "string") {
                return (
                  <a key={val} href="#" className={s.tag_link}>
                    #{val}
                  </a>
                );
              }
            }
          })}
        </div>
      </div>
    </>
  );
};
