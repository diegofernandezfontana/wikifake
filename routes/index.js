const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');
var Page = models.Page;
var User = models.User;


router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function(req, res, next) {

    Page.findAll()
    .then(function(pages){
        res.render('index' ,{pages:pages})
    })
    .catch(next)
    //.then(page => res.send(page));

});


module.exports = router;
