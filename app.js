const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dictionary = require("english-word-dictionary");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index");
})
app.post("/", async function (req, res) {
    const word = req.body.word;
    try {
        const result = await dictionary.search(word);
        const meanings = result[0].meanings;
        res.render("result", { word: word, meanings: meanings });
    }catch(err){
        res.render("error");
    }
})
app.listen(3000, function (req, res) {
    console.log("Server has started on port 3000");
})

