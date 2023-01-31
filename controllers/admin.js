exports.createAdmin = async (req, res) => {
  const adminInfo = {
    ssn: "123456789",
    username: "admin",
    password: bcrypt.hashSync(admin, 8),
    role: "admin",
  };

  try {
    const user = await prisma.user.create({
      data: adminInfo,
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
