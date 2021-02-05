const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [{token: {type: String}}]
  },
  { timestamps: true }
  //shows times it created and last updated
);

userSchema.statics.findCredentials = async (email, password) => {
  const user = await User.findOne({email})
  //finds user by the email entered through function 
if (!user) {
  throw new Error ("Unable to login")
  //if the user doesnt exist, throw error that states, unable to login
}
  const passwordsMatch = await bcrypt.compare(password, user.password)
  //compares password from the password entered and the password that is related to that user
  if(!passwordsMatch) {
    throw new Error("Unable to login")
    //if the passwords dont match, throws error unable to login
  }
  
  return user
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: "1 week"})
  this.tokens.push({token})
  //({token: token})
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};