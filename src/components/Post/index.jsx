import React, { useContext, useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Favorite, ExpandMore, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";

import s from "./styles.module.css";

dayjs.locale("ru");

const ExpandMoreStyle = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(360deg)",
  marginLeft: "auto",
}));



export const Post = ({
  handlePostDelete,
  onPostLike,
  _id,
  likes,
  image,
  title,
  author,
  text,
  created_at,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [expanded, setExpanded] = useState(false);
  const isLiked = likes.some((id) => id === currentUser._id);
  const dataFormated = dayjs(created_at).format("DD MMMM YYYY, dddd");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    onPostLike({ _id, likes });
  };

  const handleDeleteClick = () => {
    handlePostDelete(_id);
  };

  return (
    <>
      <Grid container item xs={6} sm={4} md={3}>
        <Card
          sx={{
            border: 0.5,
            borderColor: "rgba(128, 128, 128,0.2)",
            width: "100%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={author?.avatar && author?.avatar}
                aria-label="recipe"
              >
                {!author?.avatar && author?.name.slice(0, 3)}
              </Avatar>
            }
            action={
              <IconButton aria-label="delete" onClick={handleDeleteClick}>
                {author?.name === currentUser.name ? <Delete /> : <p></p>}
              </IconButton>
            }
            title={author?.email}
            subheader={dataFormated}
          />
          <Link to={`/post/${_id}`} style={{ textDecoration: "none" }}>
            <CardMedia component="img" height="194" image={image} alt="Post" />

            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="body2" noWrap color="text.secondary">
                {text}
              </Typography>
            </CardContent>
          </Link>

          <CardActions sx={{ marginTop: "auto" }} disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
              {isLiked ? <Favorite sx={{ fill: "red" }} /> : <Favorite />}
            </IconButton>
            <p>{likes.length}</p>

            <ExpandMoreStyle
              expand={expanded}
              onClick={handleExpandClick}
              aria-label="show more"
            >
              <ExpandMore />
            </ExpandMoreStyle>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph sx={{ color: "black" }}>
                {text}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
};
