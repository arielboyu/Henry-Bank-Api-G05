const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post("/register", async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    const { id, givenName, familyName, email, photoURL, isAdmin } = user;
    return res.send(
      jwt.sign(
        {
          id,
          givenName,
          familyName,
          email,
          photoURL,
          isAdmin,
        },
        "secreto"
      )
    );
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});

server.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
  //  console.log("USER", user)
  const userData = {token: jwt.sign(user, "secreto"),
                    user}
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(userData);

  })(req, res, next);
});

module.exports = server;