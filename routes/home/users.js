var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient
const DB_STR = "mongodb://localhost:27017/myblog"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
router.get('/logout',function(req,res,next){
    req.session.isLogin = null
    res.redirect('/admin/users')
})
router.post('/signin', function(req, res, next) {
   var username = req.body.username
    var pwd = req.body.pwd
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('users')

        c.find({username:username,pwd:pwd}).toArray(function(err,docs){
            if(err){
                res.send(err)
                return
            }
            if(docs.length){
                req.session.isLogin = true
                res.redirect('/admin/index')
            }else{
                res.redirect('/admin/users')
            }
        })
    })
});
module.exports = router;
