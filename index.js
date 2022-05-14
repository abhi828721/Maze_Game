const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const auth = require('./routes/User');
const methodOverride = require('method-override');

const app = express();


//static folder
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Express middleware
app.use('/user', auth)

//Connect to the database
mongoose.connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log('connected'))
  .catch(e=>console.log(e));

app.get('/', (req,res) => {
    res.redirect('/login.html');
});

app.listen(4000, () => {
    console.log("Server stared pooling 4000");
})