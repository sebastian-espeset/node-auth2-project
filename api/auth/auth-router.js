const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isValid } = require("../services/isValid");
const Users = require("../users/users-model.js");
const {jwtSecret} = require("../../config/secrets");

const makeToken = (userObject) => {
  const payload = {
    subject: userObject.id,
    username: userObject.username,
    department: userObject.department,
  };
  const options = {
    expiresIn: "300s",
  };
  return jwt.sign(payload, jwtSecret , options);
};

router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 10;

    //here's where we hash the pw
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    //here's where we save to user to the database
    Users.add(credentials)
      .then((user) => {
        res.status(200).json({ data: user });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } else {
    res.status(400).json("please provide all required information");
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
          if (user && bcryptjs.compareSync(password, user.password)) {
              const token = makeToken(user);

          res.status(200).json({
            message: `welcome to our api ${user.username}`,
            token,
          });
        } else {
          res.status(401).json({ message: "invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "please provide username and password" });
  }
});
module.exports = router;
