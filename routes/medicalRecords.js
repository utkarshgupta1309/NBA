var express = require('express')
var router = express.Router()


const User = require('../modals/users')


router.get('/', function(req,res){
    res.render('loginOrSignup')
})
router.get('/login', (req,res) => {
    res.render('login')
})
router.get('/signup', (req,res) => {
    res.render('signup')
})
router.get('/login/createRecord/:id', (req,res) => {
    var id = req.params.id; 
    res.render('createRecord', {id: id})
})

//POST requests
router.post('/signup', (req,res) => {
    var pin = req.body.pin;
    var cpin = req.body.cpin
    if(pin === cpin)
    {
        var item = req.body;
        delete item.cpin;
        const user = new User(item);

        user.save()
        .then((result) => {
            res.redirect('/medical-records/login')
        })
        .catch((err) => console.log(err))

    }
    else{
        res.send('PINS Do not match')
    }
    
})
router.post('/login', (req,res) => {
    console.log("-----------------------", req.body);
    User.findOne({
        "aadharNo": req.body.aadharNo,
        "pin": req.body.pin
    })
    .then((result) => {
       res.render('dashboard', {user: result})
       console.log(result);
    })
    .catch((result) => {
        res.send('User not found')
    })
});
router.post('/login/createRecord/:id', (req,res) => {
    var id = req.params.id;
    User.findOneAndUpdate(
        {_id: id},
        {medicalRecord: req.body},
        {
            upsert: true,
            new:true,
            overwrite: false
        }
    )
    .then((result) => {
        res.render('dashboard', {user: result})
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;