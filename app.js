const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
methodOverride = require('method-override')
app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride("_method"))

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

// NEW
app.get('/blogs/new', (req, res)=>{
	res.render('new')
})

// CREATE
app.post('/blogs', (req, res)=>{
    Blog.create(req.body.blog, (err, results)=>{
        if(err) throw err;
        console.log("Add Successfully..!!")
    })
    res.redirect('/blogs')
})

// SHOW
app.get('/blogs/:id', (req, res)=>{
    Blog.findById(req.params.id, (err, results)=>{
        if (err) throw err;
        res.render('details', { blog: results })
    })
})

// SHOW
app.get('/blogs/:id/edit', (req, res)=>{
    Blog.findById(req.params.id, (err, results)=>{
        if (err) throw err;
        res.render('edit', { blog: results })
    })
})

// UPDATE
app.put('/blogs/:id', (req, res)=>{
    Blog.update({ _id:req.params.id}, req.body.blog, (err, results)=>{
        if (err) throw err;
        res.redirect('/blogs/'+req.params.id)
    })
})


app.listen(port, ()=>{
	console.log('Blog App is served on localhost:3000 !!')
})