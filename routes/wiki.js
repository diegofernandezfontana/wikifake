const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});



router.get('/:urlTitle', function(req,res,next){
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        res.render('wikipage', {foundPage})
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.nombreAutor,
            email: req.body.emailAutor
        }
    })
    .then(function(values){
        var user = values[0];
    //    console.log(user);
        var page = Page.build({
            title: req.body.title,
            content: req.body.content,
        });
        return page.save()
        .then(function(page){
            return page.setAuthor(user);
        })
    })
    .then(function(page){
        res.redirect(page.urlTitle)
    })
    .catch(next)
});

module.exports = router;
