var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        ssn: req.body.ssn,
        username: req.body.username.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role,
      },
    });

    var token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      process.env.API_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.status(200).send({
      message: "User was registered successfully!",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    res.status(401).send({
      message: error.meta.target,
    });
    return;
  }

  return;
};

exports.signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username.toLowerCase(),
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
        role: user.role,
        username: user.username,
      },
      process.env.API_SECRET,
      {
        expiresIn: 60 * 60 * 24,
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
    console.log(error);
    res.status(500).send({
      message: error,
    });
    return;
  }
};
