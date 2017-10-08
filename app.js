var express     = require("express");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var methodOverride = require("method-override");
var app         = express();


// App config
mongoose.connect("mongodb://localhost/restful_blog_app", function(err, db){
    if(err){
        console.log(err);
    }else{
        console.log("conneted");
    }
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


// Mongoose Model confit 
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created: {type:Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);



// Restful Routes

//Blog.create(
//    {
//        title:"The Blog title",
//        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pOsU0sS4KWDAyt7kQMuoQ5038V9g8WdMtyKlltQSp2Ny0Ff20g",
//        body:"lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome "
//    },
//    {
//        title:"The Blog title 2",
//        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pOsU0sS4KWDAyt7kQMuoQ5038V9g8WdMtyKlltQSp2Ny0Ff20g",
//        body:"lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome lorem ipsome "
//    }, function(err, success){
//        if(err){
//            console.log(err);
//        }else{
//            console.log("Blog Created");
//        }
//    }
//);




// INDEX ROUTES
app.get("/blogs", function(req, res){
   Blog.find(function(err, allBlogs){
       if(err){
           console.log(err);
       }else{
           res.render("index",{blogs:allBlogs} )
       }
   }) 
});
app.get("/", function(req, res){
    res.redirect("/blogs")
})


//app.get("/blogs", function(req, res){
//    var title   = req.body.title,
//        image   = req.body.image,
//        body    = req.body.body,
//        created = req.body.created;
//    var newBlog = {title:title, image:image, body:body, created:created}
//    Blog.push(newBlog);
//    
//    // redirect to back the index page
//    res.redirect("index");
//}) 

// NEW ROUTES
app.get("/blogs/new", function(req, res){
    res.render("newblog")
})

// CREATE ROUTES
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("newblog")
        }else{
            res.redirect("/blogs");
        }
    });
})


// Show single blog/article
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blogFound){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("article", {blog:blogFound});
        }
    })
})


// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:foundBlog})
        }
    })
})

// UPDATE ROUTES
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id)
        }
    })
})




// DELETE ROUTE

app.delete("/blogs/:id", function(req, res){
    // Destroy blog and redirect somewhere
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
           res.redirect("/blogs");
        }
    })
})















const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})