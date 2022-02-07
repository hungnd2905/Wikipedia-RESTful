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

//////////////////////Requests Targetting all Articles ///////////////////////////


//chained route handler using express
app.route("/articles")
// RESTful: GET all articles
.get(function(req,res){
  Article.find(function(err, foundArticles){
    //if there is a problem, error could be seen at terminal by console log.
    if(!err){
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

//RESTful: POST one article
//Use Postman to test without creating Frontend.
//Select POST, localhost:3000/articles, Body> x-www.form-urlencoded, write Key-Value with key1=title, key2=content
.post(function(req,res){
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
})

//RESTful: DELETE all articles
.delete( function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

//////////////////////Requests Targetting A Specific Article ///////////////////////////

// Route parameter: Route path: /users/:userId/books/:bookId
app.route("/articles/:articleTitle")

//RESTful: Get a specific articles
.get(function(req,res){
  Article.findOne({title: req.params.articleTitle}, function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found. ")
    }
  });
})

//RESTful: Put(update) a specific articles completely
.put(function(req,res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})

//RESTful: Patch(update) a specific articles partly
.patch(function(req,res){
  Article.updateOne(
    {title:req.params.articleTitle},
    //$set operator replaces the value of a field with the specified value
    //E.g. : {$set: {content:"newContentTobeUpdated", value:"newValueTobeUpdated"}}
    //To make it dynamic: $set: req.body
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article.")
      } else {
        res.send(err);
      }
    }
  );
})

//RESTful: Delete(remove) a specific articles
.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if(!err){
        res.send("Successfully deleted article.")
      } else {
        res.send(err);
      }
    }
  )
});

//start server at localhost in port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
