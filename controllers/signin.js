const jwt = require("jsonwebtoken")

const checkUser = (db, bcrypt, req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return Promise.reject("incorrect form submission")
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => Promise.reject("unable to get user"))
      } else {
        Promise.reject("wrong credentials")
      }
    })
    .catch((err) => Promise.reject("wrong credentials"))
}

const getAuthTokenId = () => {
  console.log("auth ok")
}

const signToken = (email) => {
  const jwtPayload = { email }
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" })
}

const setToken = async (key, value) => {
  return await setAsync(key, value)
}

const createSession = (user) => {
  // Create the JWT here and return user data
  const { email, id } = user
  const token = signToken(email)
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token }
    })
    .catch(console.log)
}

const handleSigninAuthentication = (db, bcrypt) => (req, res) => {
  const { authorisation } = req.headers
  return authorisation
    ? getAuthTokenId()
    : checkUser(db, bcrypt, req, res)
        .then(data => res.json(data))
        .catch((err) => res.status(400).json(err))
}

module.exports = {
  handleSigninAuthentication: handleSigninAuthentication,
}
