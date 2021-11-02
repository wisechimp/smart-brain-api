const express = require("express")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const dotenv = require("dotenv")

const register = require("./controllers/register")
const signin = require("./controllers/signin")
const profile = require("./controllers/profile")
const image = require("./controllers/image")

dotenv.config()

const db = knex({
  // connect to your own database here:
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json()) // latest version of exressJS now comes with Body-Parser!

app.get("/", (req, res) => {
  res.send(db.users)
})
app.post("/signin", signin.handleSignin(db, bcrypt))
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db)
})
app.put("/image", (req, res) => {
  image.handleImage(req, res, db)
})
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(port, () => {
  console.log(`Smart Brain is running on port ${port}!`)
})
