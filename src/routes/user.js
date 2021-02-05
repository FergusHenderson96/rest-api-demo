  const { Router } = require("express");
const { getMyProfile, addUser, updateUserById, deleteUser, login } = require("../controllers/users");
const {hashPassword, auth} = require("../middleware/");
const userRouter = Router();
//creates a mini version of the router 

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.post("/users", hashPassword, addUser);
userRouter.patch("/users/:id", auth, hashPassword, updateUserById);
userRouter.delete("/users/:id", auth, deleteUser);
userRouter.post("/users/login", login);

// //tidier way
// userRouter.route("/users").get(getAllUsers).post(addUser);
// userRouter.route("/users/:id").patch(updateUserById).delete(deleteUser);

module.exports = {
  userRouter,
};