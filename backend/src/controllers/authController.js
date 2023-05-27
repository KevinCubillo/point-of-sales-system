const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authController = {

  signup: async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    try {
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, "secretkey");
      res.json({ message: "User Created", token });
    } catch (error) {
      console.log("An error occurred while signing up:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return res.status(401).send("The email doesn't exist");
      if (user.password !== password)
        return res.status(401).send("Wrong Password");
      const token = jwt.sign({ _id: user._id }, "secretkey");
      return res.status(200).json({ token });
    } catch (error) {
      console.log("An error occurred while signing in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  userExists: async (req, res) => {
    const { email } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        res.status(409).send("The email is already in use.");
      } else {
        res.status(200).send();
      }
    } catch (error) {
      console.log("An error occurred while checking if user exists:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
};

module.exports = authController;