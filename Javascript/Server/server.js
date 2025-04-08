// const { FileState } = require("@google/generative-ai/server");
// const express = require("express");
// const app = express();

// const pro = ["hemanth", "king"];

// function validateProUsers(req, res, next) {
//     const userName = req.query.user;
//     const userExists = false;
//     if (userExists){
//         next();
//     }else{
//         res.status(401).json({message: "Buy premium subscription"});
//     }
// }

// app.get("/public", (req, res) => {
//     res.json({sub: "free"});
// });

// app.get("/private", validateProUsers, (req, res) => {
//     res.json({sub: "premium"});
// });

// app.listen(3000);

const express = require("express");
const app = express();

const pro = ["hemanth", "king"]; // List of premium users

function validateProUsers(req, res, next) {
    const userName = req.query.user;

    if (!userName) {
        return res.status(400).json({ message: "User query parameter is required" });
    }

    const userExists = pro.includes(userName.toLowerCase()); // Check if user is in the list

    if (userExists) {
        next(); // 🚀 User is premium → Continue to route handler
    } else {
        res.status(401).json({ message: "Buy premium subscription" });
    }
}

app.get("/public", (req, res) => {
    res.json({ sub: "free" });
});

app.get("/private", validateProUsers, (req, res) => {
    res.json({ sub: "premium" });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
