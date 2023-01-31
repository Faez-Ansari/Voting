var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).send({
      message: "Users retrieved successfully!",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};

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

    res.cookie("bearer", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      message: "User was registered successfully!",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: error,
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

    console.log(user);

    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
      return;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
      return;
    }

    var token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
      },
      process.env.API_SECRET,
      {
        expiresIn: 60 * 60 * 24, // 1 day
      }
    );

    res.cookie("bearer", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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
