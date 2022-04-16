const jwt = require("jsonwebtoken");

module.exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Authentication failed",
        });
      if (decoded) {
        req.user = {};
        req.user.id = decoded.id;
        req.user.nickname = decoded.nickname;
        next();
      }
    });
  } else {
    return res.json({ isLoggedIn: false });
  }
};
