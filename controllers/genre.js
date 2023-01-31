const Prisma = require("@prisma/client");
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

exports.getGenres = async (req, res) => {
  try {
    const genres = await prisma.genres.findMany();

    const genresList = genres.map((i) => i.name);

    res.status(200).send({
      message: "Genres retrieved successfully!",
      genres: genresList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};

exports.addGenre = async (req, res) => {
  try {
    const genre = await prisma.genres.create({
      data: {
        name: req.body.name,
      },
    });

    res.status(200).send({
      message: "Genre created successfully!",
      data: genre,
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
