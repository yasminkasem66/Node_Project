const books = require('../models/book');
const jwt = require('jsonwebtoken')
// const books = require('../models/user');

// make our crud operatio here



exports.create = (req, res) => {
const authHeader = req.headers["token"];  //user 
    jwt.verify(authHeader, "tokentest", (err, data) => {
    if (data) {
        const book = new books({
            bookName: req.body.bookName,
            UserName: req.body.UserName,
            auther: req.body.auther,
            description: req.body.description,
            userid: data.id
        } )
        book.save()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err)
            })
    } else {
        res.send("You cannot access books");
    }

})

  

}

exports.listOneBook = async (req, res, next) => {
    try{
    books.findOne({ bookName: req.body.bookName },function (err, book) {
        if (err) res.status(400).send(err);
        res.status(200).send(book);
    });
    } catch (error) {
        console.log(error);
    }
}

exports.listAllBooks = async (req, res) => {
    try{
    await books.find()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    } catch (error) {
        console.log(error);
    }
    
}






exports.update = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "tokentest", (err, data) => {
        if (data.userType === "user" ) {
            books.findOneAndUpdate({ _id: req.params.id ,userid: data.id}, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        } else if (data.userType === "admin") {
            books.findByIdAndUpdate(req.params.id, {
                bookName: req.body.bookName,
                UserName: req.body.UserName,
                auther: req.body.auther,
                description: req.body.description
            }, { new: true },(err,book)=>{
                if(err) res.status(403).send(err);
                res.send(book);                
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}


exports.delete = (req, res) => {
    const authHeader = req.headers["token"];
    jwt.verify(authHeader, "tokentest", (err, data) => {
        if (data.userType === "user") {
            console.log(data.userType) //user
            console.log(req.params.id)//617419caf164edcbbecfd736
            console.log(data.id)//61742132507d24fa508105d7

            books.findOneAndDelete([{ _id: req.params.id }, { userid: data.id }], (err, book) => {
                console.log(userid)
                if(err) res.status(403).send(err);
                res.send("successfully deleted");                
            }).then((data) => {
                res.send("successfully deleted");
            }).catch((err) => {
                res.status(403).send(err);
            })
        }
        
        if (data.userType === "admin") {
            books.findByIdAndDelete(req.params.id,(err,book)=>{
                if(err) res.status(403).send(err);
                res.send("successfully deleted");
            })
        }
        else {
            res.send("You cannot access books");
        }

    })
}


exports.paginate= (req, res)=>{
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    books.find({}).skip(skip).limit(limit)
    .then(data => {
        res.send(data)
    }).catch (err => {
        console.log(err)
    })
};
