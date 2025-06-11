const mongoose = require("mongoose");
const express = require("express");
const { name } = require("ejs");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

const teacherSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    image: { type: String, default: 0, required: true},
    message: { type: String, default: "Hello My Name is"}
    
})

const contentSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    image: { type: String, default: 0, required: true},
    message: { type: String }
    
})

const Teacher = mongoose.model("Teacher", teacherSchema, "Teachers")

const Content = mongoose.model("Content", contentSchema, "Contents")

app.get("/", async (req, res) => {
    const teachers = await Teacher.find({});
    res.render("cards.ejs", { teachers });
});

app.get("/content", async (req, res) => {
    const content = await Content.find({});
    res.render("content.ejs",  {});
});

app.get("/admin", async (req, res) => {
    const teachers = await Teacher.find({});
    const content = await Content.find({});
    res.render("admin.ejs", { teachers, content });
});


app.delete("/delete/teachers:_id", async (req, res) => {
    const response = await Teacher.findByIdAndDelete(req.params._id);
    res.json(response);
});

app.delete("/delete/contents:_id", async (req, res) => {
    const response = await Content.findByIdAndDelete(req.params._id);
    res.json(response);
});

app.patch("/contents/update/:_id", async (req,res) => {
  const response = await Content.findOneAndUpdate({name})
})

app.patch("/teachers/update/:_id", async (req,res) => {
  const response = await Teacher.findOneAndUpdate({name})
})

app.get("/content", async (req, res) => {
    const content = await Content.find({});
    res.render("content.ejs", { content });
});

// To get content and teachers for admin page
app.get("/admin", async (req, res) => {
    const content = await Content.find({});
    const teachers = await Teacher.find({});
    res.render("admin.ejs", { content, teachers });
});

// Delete content card by ID
app.delete("/delete/contents/:id", async (req, res) => {
    const response = await Content.findByIdAndDelete(req.params.id);
    res.json(response);
});

// Add new content card
app.post("/add/content", async (req, res) => {
    try {
        const { name, image, message } = req.body;
        const newContent = new Content({ name, image, message });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


async function startServer() {
    
    await mongoose.connect("mongodb+srv://CSH:CSH2025@cluster0.yz0lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();