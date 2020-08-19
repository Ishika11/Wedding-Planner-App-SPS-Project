const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    // jwt verify also throws error on failure
    // hence in try catch block
    const decodedToken = jwt.verify(token, "my-secret");
    req.user = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};
