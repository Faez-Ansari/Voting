const jwt = require("jsonwebtoken");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (err) req.user = undefined;
        prisma.user
          .findUnique({
            where: {
              id: decode.id,
            },
          })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            req.user = undefined;
            next();
          });
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
