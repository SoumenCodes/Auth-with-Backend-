const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
const Key = "node";

app.use(express.json());

const ALL_USERS = [
  {
    username: "riya",
    password: "123",
    name: "riya",
  },
  {
    username: "siya",
    password: "345",
    name: "siya",
  },
  {
    username: "jiya",
    password: "000",
    name: "jiya",
  },
];

function userExists(username, password) {
  console.log(username, password);
  let userPresent = false;
  ALL_USERS.map((item) => {
    if (item.username == username && item.password == password) {
      userPresent = true;
      return userPresent;
    }
  });
  return userPresent;
}

app.get("/", (req, res) => {
  console.log(req.headers.auth, "========>");

  try {
    const token = req.headers.auth;
    const decoder = jwt.verify(token, Key);
    res.json({
      username: decoder.username,
      otheruser: ALL_USERS.filter((user) => user.username !== decoder.username),
    });
  } catch (error) {
    console.log(" Some error in Token =====>", token);
  }
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (userExists(username, password)) {
    const token = jwt.sign({ username }, Key);
    res.json({
      token,
    });
  } else {
    return res.status(400).json({
      msg: "user not avaiable",
    });
  }
});

app.use((err, req, res, next) => {
  console.log("Some Error ========>", err);
});

app.listen(8000, () => {
  console.log("App Runing ....");
});
