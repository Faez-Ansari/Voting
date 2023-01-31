const Prisma = require("@prisma/client");

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

exports.deleteVote = async (req, res) => {
  try {
    const vote = await prisma.vote.deleteMany();

    res.status(200).send({
      message: "Vote deleted successfully!",
      data: vote,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};

exports.postVote = async (req, res) => {
  try {
    const vote = await prisma.vote.create({
      data: {
        genreName: req.body.genreName,
        user: req.body.username,
      },
    });

    let user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    await prisma.user.update({
      where: {
        username: req.body.username,
      },
      data: {
        voteId: vote.id,
      },
    });

    res.status(200).send({
      message: "Vote created successfully!",
      data: vote,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();

    res.status(200).send({
      message: "Votes retrieved successfully!",
      data: votes,
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

exports.countVotes = async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();

    let voteCountList = [];

    votes.forEach((vote) => {
      let genreName = vote.genreName;
      let count = 0;

      votes.forEach((vote) => {
        if (vote.genreName === genreName) {
          count++;
        }
      });

      voteCountList.push({
        genreName: genreName,
        count: count,
      });
    });

    let count = voteCountList.filter(
      (vote, index, self) =>
        index === self.findIndex((t) => t.genreName === vote.genreName)
    );

    res.status(200).send({
      message: "Votes retrieved successfully!",
      data: count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
  return;
};
