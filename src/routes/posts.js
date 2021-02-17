const { Router } = require("express");
const postRouter = Router();
const { getAllPosts, getPostsByUser, addPost, updatePost, deletePost } = require("../controllers/posts");
const {} = require ("../middleware/")

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:user_id", auth, getPostsByUser); //lockdown
postRouter.post("/posts/", auth, addPost); //lockdown
postRouter.patch("/posts/:id", updatePost); //lockdown
postRouter.delete("/posts/:id", deletePost); //lockdown

module.exports = {
  postRouter,
};