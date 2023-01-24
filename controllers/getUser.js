exports.getUser = async (req, res) => {
  try {
    if (req.headers.cookie) {
      res.status(200).send({
        message: "User is logged in",
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
