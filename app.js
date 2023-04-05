const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require("lodash");
const mongoose = require("mongoose");

//Connection with db
// mongosh "mongodb+srv://blog.e8807ey.mongodb.net/blogDB" --apiVersion 1 --username shreyanshi
const url = "mongodb+srv://shreyanshi:usaMIE15141305@blog.e8807ey.mongodb.net/blogDB";
mongoose.connect(url);

//Schema
const postSchema = new mongoose.Schema({
    blog_title:  String,
    blog_body: String
});

//Model
const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    Post.find().then((posts) => {
        res.render("home", {start_content: homeStartingContent, posts: posts});
        //mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/about", function(req,res){
    res.render("about", {about_content: aboutContent});
});

app.get("/contact", function(req,res){
    res.render("contact", {contact_content: contactContent});
});

app.get("/compose", function(req,res){
    res.render("compose");
});

app.post("/compose", function(req,res){
    let post = new Post({
        blog_title: req.body.blog_title,
        blog_body: req.body.blog_body
    });
    post.save();
    res.redirect("/");
});

app.get("/posts/:postId", function(req,res){
    const requestedID = req.params.postId;

    Post.findOne({_id: requestedID}).then((found_post) => {
        res.render("post", {Post_Title: found_post.blog_title, Post_Body: found_post.blog_body});
    }).catch((err) => {
        console.log(err);
    });
});



var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server started on port 3000.");
});