const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models/User");

exports.hashPassword = async (req, res, next) => {
    //next passes the response to the controller
    if ("password" in req.body) {
        req.body.password = await bcrypt.hash(req.body.password, 8)
    }
    next();
    //passes to controller
}

exports.auth = async (req, res, next) => {
try {
const token = req.header("Authorization").replace("Bearer", "");
const decoded = jwt.verify(token, process.env.SECRET);

const user = User.findOne({_id: decoded._id, "tokens.token": token})
if (!user){
    throw new Error()
}
req.user = user
req.token = token

next();

} catch {
res.status(401).send({message: "Please Login"})
}

}
