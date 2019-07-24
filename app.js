const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// use mongodb and mongoose
mongoose.connect('mongodb://localhost/restful-blog-app', {useNewUrlParser: true})

var blogSchema = new mongoose.Schema({
    title: String,
	image: String,
    body: String,
    created_at: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema)

// Routes

app.get('/', (req, res)=>{
	res.redirect('index')
})

// INDEX
app.get('/blogs', (req, res)=>{
    Blog.find({}, (err, allBlogs)=>{
        if(err) throw err;
        res.render('index', { blogs: allBlogs })
    })
})


// CREATE
app.post('/blogs', (req, res)=>{
    const newBlog = {
        title: req.body.title,
        image: req.body.image,
        body: req.body.content
    }
    Blog.create(newBlog, (err, results)=>{
        console.log("Add Successfully..!!")
    })
    res.redirect('/blogs')
})

app.listen(port, ()=>{
	console.log('Blog App is served on localhost:3000 !!')
})