const bcrypt = require("bcrypt");
const User = require("../../../database/models/User");

const signupController = async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    debugger;
    const error = new Error("You must provide a name, username and password");
    error.status = 400;
    next(error);
  } else {
    const repitedUser = await User.findOne({ username });

    if (repitedUser) {
      const error = new Error("This username isn't avaliable");
      error.status = 400;
      next(error);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        username,
        password: hashedPassword,
      };

      const createdUser = await User.create(newUser);
      res.status(201).json(createdUser);
    }
  }
};

module.exports = signupController;
