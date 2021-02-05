const { User } = require("../models/User");

// exports.getAllUsers = async (req, res) => {
//   //this function gets users details and lists 
//   try {
//     const allUsers = await User.find({});
//     res.status(200).send(allUsers);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
exports.getMyProfile = async (req, res) => {
  res.status(200).send(req.user)
};

exports.addUser = async (req, res) => {
  //this function adds a user to the database
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    const savedUser = await user.save();
    console.log(req.body);
    res.status(201).send({ savedUser, token });
    //({savedUser: savedUser, token: token})
  } catch (error) {
    if(error.code === 11000) {
      res.status(400).send({ message: "User already exists" });
    }
    res.status(500).send({ message: "Could not connect" });
  }
};

exports.updateUserById = async (req, res) => {
  //this function updates a users details by searching their id
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //searches for user     finds user by id   id given    new password   
    console.log(user);
    res.status(200).send(user);
    //if user found, displays 202 code
  } catch (error) {
    res.status(404).send({ message: "User not found" });
    //if user not found by id then 404 displayed
  }
};

exports.deleteUser = async (req, res) => {
  //this function deletes a user by id
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = User.findByCredentials(req.body.email, req.body.password);
    const token = user.generateAuthToken();
    res.status(200).send({user, token});
  } catch (error) {
    res.status(400).send({message: "Unable to login"});
  }
}