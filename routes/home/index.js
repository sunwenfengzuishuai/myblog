var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient
const DB_STR = "mongodb://localhost:27017/myblog"
/* GET home page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('post')
        c.find().toArray(function(err,docs){
            if(err){
                res.send(err)
                return
            }

            var cl = db.collection('cats')
            cl.find().toArray(function(err,result){
                if(err){
                    res.send(err)
                    return
                }
                res.render('home/index',{data: docs,datal:result})
            })
        })
    })

});

module.exports = router;
