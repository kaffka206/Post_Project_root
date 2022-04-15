import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Container } from "@mui/material";
import api from "./utils/Api";
import { PageAllPosts } from "./pages/AllPostsPage/AllPostsPage";
import { PagePost } from "./pages/PostPage/PostPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { CurrentUserContext } from "./context/currentUserContext";
import { PageNotFound } from "./pages/NotFoundPage/NotFoundPage";
import { PageCreatePost } from "./pages/CreatePostPage.jsx/CreatePostPage";
import Pagination from "./components/Pagination/index";

export const App = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [page, setPage] = useState(
    parseInt(location.search?.split("=")[1]) || 1
  );
  const [pageLimit, setPageLimit] = useState(8);
  const [postQty, setPostQty] = useState(0);

  useEffect(() => {
    Promise.all([api.getPostsList(page, pageLimit), api.getUserInfo()]).then(
      ([postData, userData]) => {
        setPosts(postData.posts);
        setPostQty(postData.total);
        setCurrentUser(userData);
      }
    );
  }, [page, pageLimit]);

  const handleUpdateUser = (userUpdate) => {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  };

  const handlePostLike = ({ _id, likes }) => {
    const isLiked = likes.some((id) => id === currentUser._id);
    api.changeLikeStatus(_id, isLiked).then((newPost) => {
      const newPostsState = posts.map((p) => {
        return p._id === newPost._id ? newPost : p;
      });
      setPosts(newPostsState);
    });
  };

  const handlePostDelete = (_id) => {
    if (confirm("Вы хотите удалить пост?")) {
      api.deletePost(_id).then((data) => {
        const newPostsAfterDelete = posts.filter(
          (post) => post._id !== data._id
        );
        setPosts(newPostsAfterDelete);
      });
    }
  };

  const handleCreatePost = (postData) => {
    api.createPost(postData).then((newPostData) => {
      setPosts((prevState) => [...prevState, newPostData]);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onUpdateUser={handleUpdateUser} />
      <div className="content">
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PageAllPosts
                    currentUser={currentUser}
                    posts={posts}
                    handlePostLike={handlePostLike}
                    handlePostDelete={handlePostDelete}
                  />
                  <Pagination
                    page={page}
                    postQty={postQty}
                    pageLimit={pageLimit}
                    setPage={setPage}
                  />
                </>
              }
            />

            <Route
              path="/post/:postID"
              element={
                <PagePost
                  posts={posts}
                  currentUser={currentUser}
                  handlePostLike={handlePostLike}
                />
              }
            />

            <Route
              path="/postCreate"
              element={
                <PageCreatePost
                  posts={posts}
                  currentUser={currentUser}
                  handleCreatePost={handleCreatePost}
                />
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </div>
      <Footer className={cn("footer")} />
    </CurrentUserContext.Provider>
  );
};
