require("dotenv").config();
const jwt = require("jsonwebtoken");
const keys = process.env.JWT_SECRET;

function generateToken(user, role) {
  return jwt.sign(
    {
      id: user.id, role: role
    },
    keys, {expiresIn: '1d'}
  );
}
function verifyToken(token) {
  return jwt.verify(token, keys);
}
module.exports = { generateToken, verifyToken };
