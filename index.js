const express = require("express"),
  app = express(),
  userRoutes = require("./routes/user"),
  dotenv = require("dotenv"),
  cors = require("cors"),
  cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(userRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is live on port 2000");
});
