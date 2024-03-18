const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});
const testimonialsRoutes = require("./routes/testimonials.routes");
const seatsRoutes = require("./routes/seats.routes");
const concertsRoutes = require("./routes/concerts.routes");
const path = require("path");

app.use(cors());
const io = socket(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("New Socket");
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", testimonialsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", concertsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
