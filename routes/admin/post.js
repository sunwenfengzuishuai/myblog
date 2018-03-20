var express = require('express')
var router = express.Router()
var mongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
const DB_STR = "mongodb://localhost:27017/myblog"

router.get('/',function (req,res,next) {
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
            res.render('admin/article_list',{data:docs})
        })
    })

})
router.get('/add',function (req,res,next) {
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('cats')
        c.find().toArray(function(err,docs){
            if(err){
                res.send(err)
                return
            }
            res.render('admin/article_add',{data:docs})
        })
    })
})
router.get('/delete',function (req,res,next) {
    var id = req.query.id
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('post')
        c.remove({_id:ObjectId(id)},function(err,result){
            if(err){
                res.send(err)
                return
            }
            res.redirect('/admin/post')
        })
    })
})

router.post('/add',function(req,res){
    var cat = req.body.cat
    var title = req.body.title
    var summary = req.body.summary
    var content = req.body.content
    var time = new Date()

    var posts = {
        "cat":cat,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    }
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('post')
        c.insert(posts,function(err,result){
            if(err){
                res.send(err)
                return
            }
            res.send('添加文章成功了<a href="/admin/post">查看文章列表</a>')
        })
    })
})

module.exports = router