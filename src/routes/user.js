  
const { Router } = require("express");
const { getAllUsers, addUser, updateUserById, deleteUser } = require("../controllers/users");
const {hashPassword} = require("../middleware/index")
const userRouter = Router();
//creates a mini version of the router 

userRouter.get("/users", getAllUsers);
userRouter.post("/users", hashPassword, addUser);
userRouter.patch("/users/:id", hashPassword, updateUserById);
userRouter.delete("/users/:id", deleteUser);

// //tidier way
// userRouter.route("/users").get(getAllUsers).post(addUser);
// userRouter.route("/users/:id").patch(updateUserById).delete(deleteUser);

module.exports = {
  userRouter,
};