var express = require('express')
var router = express.Router()
var mongoClient = require('mongodb').MongoClient
const DB_STR = "mongodb://localhost:27017/myblog"
var ObjectId = require('mongodb').ObjectId

router.get('/',function(req,res,next){
    var id = req.query.id
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('post')
        c.find({_id:ObjectId(id)}).toArray(function(err,docs){
            if(err){
                res.send(err)
                return
            }
            res.render('home/article',{data:docs[0]})
        })
    })
})

module.exports = router;