const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}));
const morgan = require('morgan')
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://admin:admin@cluster0.yh2vu.mongodb.net/NBA?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {console.log('Mongo connected')})//Listen to requets only after db is connected
    .catch((err) => console.log(err)); 
    
//register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const medicalRecords = require('./routes/medicalRecords')
const complaints = require('./routes/complaintsRoute');
app.use(morgan('dev'));
app.use('/medical-records', medicalRecords)
app.use('/complaints', complaints)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})