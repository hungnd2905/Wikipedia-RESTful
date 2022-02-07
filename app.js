//jshint esversion:6

//require npm packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// use packages
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// setup mongodb with wikiDB, schema and model.
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// RESTful: GET all articles
app.get("/articles", function(req,res){
  Article.find(function(err, foundArticles){
    //if there is a problem, error could be seen at terminal by console log.
    if(!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

//RESTful: POST one article
//Use Postman to test without creating Frontend.
//Select POST, localhost:3000/articles, Body> x-www.form-urlencoded, write Key-Value with key1=title, key2=content
app.post("/articles", function(req,res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

//RESTful: DELETE all articles
app.delete("/articles", function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);  
    }
  });
});

//start server at localhost in port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
