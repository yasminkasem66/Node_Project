var mongoose = require('mongoose')
const users = require('../models/user');
const validator = require('validator');
const books = require('../models/book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// make our crud operatio here
// sign up function create 

exports.signUp = (req, res) => {
    let validateEmail = validator.isEmail(req.body.email); //true
    let validatePassword = validator.isStrongPassword(req.body.password); //true

    if (validateEmail && validatePassword) {
        var user = new users({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10), 
            email: req.body.email,
            firstName: req.body.firstName
        })

    } else {
        res.status(401).send(`unvailed Email or password`)
    }
    user.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(401).send(err)
        })

}
// login
exports.login = (req, res) => {           
    users.findOne({ email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).send("serever error");
            }
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).send("user not found please register");
        }
        const userToken = jwt.sign({ id: user._id, username: user.username, userType: user.userType }, "tokentest");
        jwt.verify(userToken, "tokentest" , (err, data) => { //id , username , usertype
            if (data) {
                books.find({} , (err, books) => {
                    const c = `userName:${data.username} 
                    books:${books}
                    token:${userToken}`;
                    res.send(c);
                });
            }
            if (err) {
                res.send("Your cannot access");
            }
        });
        
    });
}
//list all users 
exports.list = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "tokentest", (err, data) => {
        if (data.userType === "admin" ) {
            users.find({}, { username: 1 , userType:1, _id:0 }).then(function (user) {
                res.send(user);
            });
        } else {
            res.send("You cannot access users");
        }
    })
}

exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "tokentest", (err, data) => {
        if (data.userType === "admin") {
            users.findByIdAndUpdate(req.params.id, {  // take only one param 
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                firstName: req.body.firstName,
                userType: req.body.userType
            }, { new: true })
                .then(user => {
                    res.send(user)
                });          
        } else if (data.userType === "user" && req.params.id == data.id) {
            
            console.log(data.userType);
            console.log(req.params.id);
            console.log(data.id);
            users.findByIdAndUpdate(req.params.id, { ///data.id
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                firstName: req.body.firstName
            }, { new: true })
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");

        }
})

}


exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "tokentest", (err, data) => {
        console.log(data.userType);
        if (data.userType === "admin") {
            users.findByIdAndDelete(req.params.id)
                .then(user => {
                    res.send(user)
                })           
        } else if (data.userType === "user" && req.params.id == data.id ){
            users.findByIdAndDelete(data.id)
                .then(user => {
                    res.send(user)
                })   
        }
        else {
            res.send("You cannot access users");
        }
})

}






