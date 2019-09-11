require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require("./Controllers/authController");
const dashCtrl = require("./Controllers/dashboardController");
const projCtrl = require("./Controllers/projectController");

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  SECRET_STRIPE_KEY
} = process.env;

const app = express();
const stripe = require("stripe")(SECRET_STRIPE_KEY);
app.use(express.json());

massive(CONNECTION_STRING)
  .then(dbInstance => {
    console.log("Connected :)");
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.use(express.static(`${__dirname}/../build`));

app.get("/auth/session", authCtrl.getSession);

//USER
app.get("/auth/logout", authCtrl.logoutUser);
app.get("/auth/user/:id");
app.post("/auth/register", authCtrl.registerUser);
app.post("/auth/login", authCtrl.loginUser);

//DASHBOARD
app.get("/api/projects", dashCtrl.allProjects);
app.post("/api/projects", dashCtrl.newProject);
app.get("/api/projects/:id", dashCtrl.oneProject);
// app.put("/api/projects/:id", dashCtrl.editProject);
app.delete("/api/projects/:id", dashCtrl.deleteProject);

//TASKS
app.get("/api/tasks/:id", projCtrl.allTasks);
app.post("/api/tasks", projCtrl.addTask);
app.put("/api/tasks/:id", projCtrl.editTask);
// app.delete("/api/tasks/:id", projCtrl.deleteTask);
app.put("/api/projects/:id", projCtrl.deleteTask);

//STRIPE
app.post("/charge", async (req, res) => {
  console.log(req.body.token);
  try {
    let { status } = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "FAKE MONEY",
      source: req.body.token
    });
    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));
