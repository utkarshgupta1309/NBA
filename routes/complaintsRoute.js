const express = require('express')
var router = express.Router()

const Complaint = require('../modals/newComplaint')

router.get('/', function (req, res) {
    res.render('create-complaint')
});
router.get('/all-complaints', function (req, res) {
    Complaint.find().sort({createdAt: -1})
    .then((result) => {
        res.render('allComplaints', {complaints: result})
    })
})
router.post('/create', (req,res) => {
    console.log(req.body);

    const complaint = new Complaint(req.body);

    complaint.save()
    .then((result) => {
        res.redirect('/complaints/all-complaints')
    })
    .catch((err) => console.log(err))


})

module.exports = router