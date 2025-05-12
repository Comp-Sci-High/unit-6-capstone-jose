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

app.get("/", async (req, res) => {
    const teachers = await Content.find({});
    res.render("content.ejs", { Contents });
});


app.delete("/delete/teachers:id", async (req,res) => {
    const response = await Teacher.findOneAndDelete({ name: req.params._id})
res.json(response)
})

app.delete("/delete/contents:id", async (req,res) => {
    const response = await Content.findOneAndDelete({ name: req.params._id})
res.json(response)
})

app.patch("/contents/update/:id", async (req,res) => {
  const response = await Content.findOneAndUpdate({name})
})

app.patch("/teachers/update/:id", async (req,res) => {
  const response = await Teacher.findOneAndUpdate({name})
})


async function startServer() {
    
    await mongoose.connect("mongodb+srv://CSH:CSH2025@cluster0.yz0lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();