const bcrypt = require("bcryptjs");

module.exports = {
  registerUser: async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const db = req.app.get("db");

    const result = await db.get_user(username).catch(err => console.log(err));
    const existingUser = result[0];
    if (existingUser) {
      res
        .status(401)
        .json("Username is already taken. Please choose a different username.");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt
        .hash(password, salt)
        .catch(err => console.log(err));
      const user = await db
        .create_user([firstName, lastName, email, username, hash])
        .catch(err => console.log(err));

      req.session.user = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username
      };
      res.status(201).json(req.session.user);
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    console.log("hi");

    const user = await db.get_user(username).catch(err => console.log(err));
    const existingUser = user[0];
    console.log(existingUser);
    if (!existingUser) {
      return res.status(401).json("Incorrect username or password");
    } else {
      const isAuthorized = await bcrypt
        .compare(password, existingUser.password)
        .catch(err => console.log(err));
      console.log(isAuthorized);

      if (!isAuthorized) {
        res.status(401).json("Incorrect username or password");
      } else {
        req.session.user = {
          ...existingUser
        };
        console.log(req.session.user);
        res.json(req.session.user);
      }
    }
  },

  getSession: (req, res) => {
    console.log(req.session.user);
    res.status(200).json(req.session.user);
  },

  logoutUser: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  }
};

//   getAllUsers
