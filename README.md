# Wikipedia-RESTful
Build a Wikipedia web app RESTful (HTTP Verb: GET, POST, PUT, PATCH, DELETE) without Frontend, using Javascript, Express, Node.js, MongoDB, HTML, CSS and Postman 

# RESTful :GET, POST, PUT, PATCH, DELETE
1. GET: 
  - /articles : fetch all the articles. 
  - /articles/hung: fetch article "hung"

2. POST: 
  - /articles: create one new article

3. PUT: 
  - /articles/hung: update the article on hung (completely)

4. PATCH: 
  - /articles/hung: update the article on hung(partly)

5. DELETE: 
  - /articles: delete all the articles
  - /articles/hung: delete the articles on hung
  
# GET (all articles):
- app.js : app.get(route, function(req,res){});
- DB(READ): <ModelName>.find({conditions}, function(err, results){});
- {conditions}: optional, if not: find all.
- More info: MongoDB Documentation  

# POST (a specific article):
- app.js: app.post(route,function(req,res){});
- DB(CREATE): const <constantName> = new <ModelName>({
  <fieldName> : <fieldData>,
  ....
  });
  <constantName>.save();

# DELETE ( all articles):
-app.js: app.detele(route, function(req,res){
});
-DB(DELETE): <ModelName>.deleteMany(
  {condition},
  function(err){
  }
);
