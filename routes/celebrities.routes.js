// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//const { populate } = require("../models/User.model");

router.route('/create')
.get((req,res)=>{
    res.render('celebrities/new-celebrity')
})
.post((req,res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    const catchPhrase = req.body.catchPhrase
    const celebrity = {name,occupation,catchPhrase}
    
    Celebrity.create(celebrity)
    .then(res.redirect('/celebrities'))
    .catch((error)=>{
        console.log(error)
        res.render('/celebrities/new-celebrity')
    })
})


router.route('/')
.get((req,res)=>{
    Celebrity.find()
    .then((celebrities)=>res.render('celebrities/celebrities',{celebrities}))
})



module.exports = router; 