const jwt = require("jsonwebtoken");
const Prisma = require("@prisma/client").PrismaClient;

const prisma = new Prisma();
// get request for logged in user

exports.getUser = async (req, res) => {
  try {
    if (req.headers.authorization.split(" ")[1] !== "null") {
      const token = req.headers.authorization.split(" ")[1];
      // verify bearer token
      const decoded = jwt.verify(token, process.env.API_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          username: decoded.username,
        },
      });

      res.status(200).send({
        message: "User was registered successfully!",
        data: {
          username: user.username,
          role: user.role,
          ssn: user.ssn,
        },
      });
      return;
    }

    res.status(401).send({
      message: "User not logged in!",
    });
    return;
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
