const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
    User.findAll().then(function(users){
        console.log(users);
        res.render('users', { users: users });
    }).catch(next);
});

router.get('/:userId', function(req, res, next) {

    var usuario = req.params.userId
    console.log(usuario);

})


module.exports = router;
