import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure "views" points to the correct location
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files

const PORT = process.env.PORT || 1000;

// Function to format date
function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Sample Blog Data
let blogs = [
  {
    title: "Exploring the Cosmos",
    blog: "The universe is vast and mysterious, filled with wonders beyond our imagination. Scientists continue to uncover its secrets.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "The Art of Mindfulness",
    blog: "Practicing mindfulness can lead to a more peaceful and fulfilling life. It helps us stay present and aware of our surroundings.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "Tech Trends in 2025",
    blog: "Artificial Intelligence, Quantum Computing, and Blockchain are shaping the future. What new innovations will emerge next?",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "The Magic of Music",
    blog: "Music has the power to heal, inspire, and connect people across cultures. A single melody can evoke deep emotions.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "Healthy Eating Habits",
    blog: "A balanced diet is key to a long and healthy life. Incorporating fruits, vegetables, and whole grains is essential.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "The Rise of Remote Work",
    blog: "The shift to remote work has transformed the corporate world. Companies are adapting to new ways of collaboration.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "The Psychology of Motivation",
    blog: "Understanding what drives us can help us achieve our goals. Intrinsic motivation is often more powerful than extrinsic rewards.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "SpaceX and the Future of Mars Colonization",
    blog: "Elon Musk's vision of making humans a multi-planetary species is becoming more realistic with each rocket launch.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "A Beginner’s Guide to Investing",
    blog: "Understanding stocks, bonds, and crypto can help build wealth over time. The key is patience and research.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
  {
    title: "The History of Video Games",
    blog: "From Pong to modern VR, video games have evolved into a billion-dollar industry that captivates millions worldwide.",
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  },
];


app.get("/", (req, res) => {
  res.render("homepage", { blogs });
});

app.get("/home", (req, res) => {
  res.render("homepage", { blogs });
});

app.get("/create-post", (req, res) => {
  res.render("form");
});

// Create new post
app.post("/create-post", (req, res) => {
  const newPost = {
    ...req.body,
    id: uuidv4().substring(0, 2),
    date: getFormattedDate(),
  };
  blogs.push(newPost);
  res.redirect("/home");
});

// Update post
app.post("/update-post/:id", (req, res) => {
  const blogId = req.params.id;
  let blog = blogs.find((b) => b.id === blogId);
  if (blog) {
    blog.title = req.body.title;
    blog.blog = req.body.blog;
    blog.date = getFormattedDate();
  }
  res.redirect("/");
});

// Edit post page
app.get("/edit-post/:id", (req, res) => {
  const blogId = req.params.id;
  let blog = blogs.find((b) => b.id === blogId);
  if (!blog) return res.status(404).send("Blog not found");
  res.render("edit", { blog });
});

// Delete post
app.post("/del-post/:id", (req, res) => {
  blogs = blogs.filter((b) => b.id !== req.params.id);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
