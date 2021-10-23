const express = require('express');
const router = express.Router();

const users = require('../controller/user');


router.post('/', users.signUp)

router.post('/login', users.login)
//create

router.get('/', users.list)// only admin 
router.delete('/:id', users.delete)  //update admin ,  the same user of the account
router.put('/:id', users.update) //delete admin ,  the same user of the account

// router.get('/:limit', users.list)




module.exports = router