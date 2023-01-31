const express = require("express"),
  app = express(),
  userRoutes = require("./routes/user"),
  dotenv = require("dotenv"),
  cors = require("cors"),
  cookieParser = require("cookie-parser");

// get config vars
dotenv.config();

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

//using user route
app.use(userRoutes);

//setup server to listen on port 8080
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is live on port 2000");
});
