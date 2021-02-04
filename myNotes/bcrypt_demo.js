const bcrypt = require("bcryptjs")
//password hashing

const myFunction = async () => {
const password = "Fergus"
const hashedPassword = await bcrypt.hash(password, 8);
//takes password and assigns the amount of times (salt rounds)
console.log(hashedPassword);

const passwordsMatch = await bcrypt.compare(password, hashedPassword)
console.log(passwordsMatch)
};

myFunction();