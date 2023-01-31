const jwt = require("jsonwebtoken");
const Prisma = require("@prisma/client");
const prisma = new Prisma.PrismaClient();

exports.getUser = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.API_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          username: decodedToken.username,
        },
      });

      res.status(200).send({
        user: {
          username: user.username,
          vote: user?.voteId,
          role: user.role,
        },
      });
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
  return;
};

exports.deleteUserSession = async (req, res) => {
  try {
    res.setHeader("Set-Cookie", "bearer=; HttpOnly; Path=/");
    res.status(200).send({
      message: "User session deleted successfully!",
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};
