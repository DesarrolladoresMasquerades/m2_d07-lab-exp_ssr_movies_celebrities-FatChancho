// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const { find } = require("../models/Movie.model");

router.route('/create')
.get((req,res)=>{
    Celebrity.find()
    .then((celebrities)=>{
        res.render('movies/new-movie',{celebrities})
    })
    .catch((error)=>console.log(error))
})
.post((req,res)=>{
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    
    const movie = {title,genre,plot,cast};

    Movie.create(movie)
    .then(res.redirect('/movies'))
    .catch((error)=>console.log(error))

})

router.route('/')
.get((req,res)=>{
    Movie.find()
    .then((peli)=>{res.render('movies/movies',{peli})})
    .catch((error)=>console.log(error))
})

//movie-detail

router.route('/:id')
.get((req,res)=>{
    Movie.findById(req.params.id)
    .populate('cast')
    .then((movie)=>res.render('movies/movie-detail',movie))
})

//DELETE
router.route('/:id/delete')
.post((req,res)=>{
    Movie.findByIdAndRemove(req.params.id)
    .then(()=>res.redirect('/movies'))
    .catch((error)=>console.log(error))
})

//EDIT
router.route('/:id/edit')
.get((req,res)=>{
    let movie='';
    const id=req.params.id;
    Movie.findById(id)
    .then((peli)=>{
        movie = peli
        Celebrity.find()
        .then((celebrity)=>res.render('movies/edit-movie',{movie,celebrity}))
    })
    .catch((error)=>console.log(error))
})
.post((req,res)=>{
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
    const id = req.params.id;

    const movie={title,genre,plot,cast}

    Movie.findByIdAndUpdate(id,movie,{new:true})
    .then(()=>res.redirect(`/movies/${id}`))
    .catch((error)=>console.log('there was an error!!',error))
})



module.exports = router;