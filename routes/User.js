const express = require('express');
const User = require('../model/User');
const router = express.Router();

router.get('/signin', (req,res) => {
    res.redirect("/signin.html");
})

router.post('/signin', async (req,res)=>{
    const user = new User({
        name : req.body.name,
        username : req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.redirect('/user/login');
    } catch (err) {
        console.log(err);
        res.status(400).send("Some error occured")
    }
});

router.get('/login', (req,res) => {
    res.redirect("/login.html")
});

router.post('/login', async (req,res) => {
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send(`User does not exist ${user.email}`);
    if(user.password !== req.body.password){
        return res.status(403).send(`invalid login ${user.password}, ${user.email}`);
    }
    res.redirect('/');
    
});

module.exports = router;

