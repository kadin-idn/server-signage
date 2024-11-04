const { verifyToken } = require("../helpers/jwt");


const Authentication = (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: "Unauthenticated" };
    
    const [Bearer, token] = access_token.split(" ");
    if (Bearer !== "Bearer") throw { name: "InvalidToken" };
    
    const verify = verifyToken(token);
    if (!verify) throw { name: "Unauthenticated" };
    
    req.user = {
      id: verify.id,
      role: verify.role,
    };
    next();
    
  } catch (error) {
    console.log(error);
    if(error.name === "Unauthenticated") {
      res.status(401).json({ message: "Unauthenticated" });
    } else if (error.name === "InvalidToken") {
      res.status(401).json({ message: "Invalid Token" });
    } else {
    res.status(401).json({ message: "Unauthenticated" });
    }
  }
};

module.exports = Authentication;
