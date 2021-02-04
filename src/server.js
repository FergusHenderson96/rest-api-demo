require("./db/connection");
//will run file inside server file, connection.js only job is to connect to mongoDB
const express = require("express");
//imports express 
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { postRouter } = require("./routes/posts");

const port = process.env.PORT || 5000;
const app = express();
//creates an instance of express 

app.use(express.json());
//converts data to json
app.use(cors());
app.use(userRouter);
app.use(postRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.listen(port, () => {
  //listens for a port number
  console.log(`Server is listening on port ${port}`);
});