require("./db/connection");


const express = require("express");
const {User} = require("./model/User");
const port = process.env.PORT || 5000
const app = express();
app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).send({message: "API is working"})
    });

app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).send(allUsers);
    }catch (error) {
        res.status(500).send(error);
    }
});

//http://localhost:5000/users

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        console.log(req.body);
        res.status(201).send({message: "Successfully added to database"})
    } catch (error) {
        res.status(500).send({message: "Could not connect"})
    }
})

app.patch("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id, req.body, {new: true});
        console.log(user)
        res.status(200).send(user);
    }catch (error) {
        res.status(404).send({message: "user not found"});
    }
})

app.delete("/user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    }catch (error) {
        res.status(404).send({message: "user not found"});
    }
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});