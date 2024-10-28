const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config()
const connectMongodb = require("./src/validate_user")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.use(cors({
  origin: 'http://localhost:8081',  
}))

app.post("/login", async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  const existingUser = await connectMongodb(userNameOrEmail)
	
  if (!existingUser?.length) {
		return res.status(400).json({ message: "Invalid Credentials" })
  }
	
	const user = existingUser[0]
	const isPasswordValid =  password === user.password

	if (!isPasswordValid) {
		return res.status(400).json({ message: "Invalid Credentials" })
  }
  //const isPasswordValid = await bcrypt.compare(password, user.password)
	
  const token = jwt.sign(
    { id: user._id, userNameOrEmail: user.email, name: user.name },
    "secret123",

    { expiresIn: "2h" }
  )

 

const session = {
  _id:user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  dateOfBirth: user.dateOfBirth,
  token
}

	res.status(200).json({session})
})

app.get("/", (_, res) => {
  res.send({ service: "OAuth is running!" });
});

const port = "3000";

app.listen(port, () => console.log(`Server Running......, http://192.168.1.4:${port}`));
