import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Breadcrumbs, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { FormCreate } from "../../components/FormCreate";

export const PageCreatePost = ({ posts, handleCreatePost }) => {
  const navigate = useNavigate();

  function handleClickBread(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleBackClick = () => {
    navigate(-1);
  };

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
          <Typography color="text.primary"variant="contained">Create Post</Typography>
        </Breadcrumbs>
      </div>

      <a href="#" onClick={handleBackClick}>
        <IconButton aria-label="back">
          <ArrowBack />
        </IconButton>
      </a>

      <h1 style={{ color: "rgb(255, 215, 0)" }}>Create Post</h1>

      <FormCreate posts={posts} handleCreatePost={handleCreatePost} />
    </>
  );
};
