var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  console.log(req.body);
  const user = await prisma.user.create({
    data: {
      ssn: req.body.ssn,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
    },
  });

  res.status(200).send({
    message: "User was registered successfully!",
    data: user,
  });
};

exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        ssn: req.body.ssn,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    //signing token with user id
    var token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    //responding to client request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
    return;
  }
};
