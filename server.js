const express = require("express");
const cors = require("cors");
const hbs = require("express-handlebars");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
  { id: 1, author: "Wiktoria Bul", text: "This company is worth every coin!" },
  {
    id: 1,
    author: "Przemysław Bul",
    text: "This really how to make you happy!",
  },
];

app.get("/testimonials", (req, res) => {
  res.json(db);
});
app.get("/testimonials/:id", (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonial = db.find(
    (testimonial) => testimonial.id === testimonialId
  );

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ error: "Testimonial not found" });
  }
});
app.get("/testimonials/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const randomTestimonial = db[randomIndex];
  res.json(randomTestimonial);
});
app.post("/testimonials", (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    res.status(400).json({ message: "Author and text are required" });
  } else {
    const newTestimonial = {
      id: uuidv4(),
      author,
      text,
    };
    db.push({ message: "OK" });
  }
});
app.put("/testimonials/:id", (req, res) => {
  const { author, text } = req.body;
  const testimonialId = parseInt(req.params.id);
  const testimonial = db.find(
    (testimonial) => testimonial.id === testimonialId
  );

  if (!testimonial) {
    res.status(400).json({ message: "Testimonial not found" });
  } else {
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: "OK" });
  }
});
app.delete("/testimonials/:id", (req, res) => {
  const testimonialId = parseInt(req.params.id);

  const index = db.findIndex((testimonial) => testimonial.id === testimonialId);

  if (index === -1) {
    res.status(404).json({ message: "Testimonial not found" });
  } else {
    db.splice(index, 1);

    res.json({ message: "OK" });
  }
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});
app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
