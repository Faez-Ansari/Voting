const express = require("express"),
  app = express(),
  userRoutes = require("./routes/user");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//using user route
app.use(userRoutes);

//setup server to listen on port 8080
app.listen(process.env.PORT || 2000, () => {
  console.log("Server is live on port 2000");
});
