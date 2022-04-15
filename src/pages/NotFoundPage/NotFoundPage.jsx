import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Breadcrumbs, Typography } from "@mui/material";
import { NotFound } from "../../components/NotFound";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  function handleClickBread(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
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
          <Typography color="text.primary">NotFound</Typography>
        </Breadcrumbs>
      </div>
      <NotFound />
    </>
  );
};
