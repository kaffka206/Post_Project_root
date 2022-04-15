import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Breadcrumbs, Typography } from "@mui/material";
import api from "../../utils/Api";
import { SeePost } from "../../components/SeePost/index";
import { useParams, Link } from "react-router-dom";

export const PagePost = ({ handlePostLike, posts }) => {
  const [post, setPost] = useState([]);
  const { postID } = useParams();

  useEffect(() => {
    api.getPostById(postID).then((postData) => {
      setPost(postData);
    });
  }, [posts]);

  function handleClickBread(event) {
    event.preventDefault();
  }

  return (
    <>
      <div
        className={cn("add__margin")}
        role="presentation"
        onClick={handleClickBread}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={"/home"} style={{ textDecoration: "none", color: "grey" }}>
            Home
          </Link>
          <Link to={`/`} style={{ textDecoration: "none", color: "grey" }}>
            All Posts
          </Link>
          <Typography color="text.primary"> Post</Typography>
        </Breadcrumbs>
      </div>

      <SeePost {...post} onPostLike={handlePostLike} />
    </>
  );
};
