const express = require("express");
const cors = require("cors");
const hbs = require("express-handlebars");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res) => {
  res.status(404).send("404 not found...");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
