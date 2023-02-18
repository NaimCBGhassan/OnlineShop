import User from "../models/User.js";

export const exist = async (req, res, next) => {
  const { username, email } = req.body;
  const usernameExist = await User.findOne({ username });
  const emailExist = await User.findOne({ email });

  if (usernameExist && emailExist) {
    return res.json([
      { username: usernameExist.username, message: "Username already exist" },
      { email: emailExist.email, message: "Email already exist" },
    ]);
  }
  if (usernameExist) {
    return res.json([{ username: usernameExist.username, message: "Username already exist" }]);
  }
  if (emailExist) {
    return res.json([{ email: emailExist.email, message: "Email already exist" }]);
  }
  return next();
};
