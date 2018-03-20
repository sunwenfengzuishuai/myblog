var express = require('express')
var router = express.Router()
var mongoClient = require('mongodb').MongoClient
const DB_STR = "mongodb://localhost:27017/myblog"
var ObjectId = require('mongodb').ObjectId

router.get('/',function (req,res,next) {
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
                res.render('admin/category_list',{data:docs})
            })
    })

})
router.get('/add',function (req,res,next) {
    res.render('admin/category_add')
})
router.get('/edit',function (req,res,next) {
    var id = req.query.id
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('cats')
        c.find({_id:ObjectId(id)}).toArray(function(err,docs){
            if(err){
                res.send(err)
                return
            }
            console.log(docs);
            res.render('admin/category_edit',{data:docs[0]})
        })
    })

})

router.post('/add',function (req,res,next) {
    var title = req.body.title
    var sort = req.body.sort
    // console.log(title,sort)
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err)
            return
        }
        var c = db.collection("cats")
        c.insert({title:title,sort:sort},function (err,result) {
            if(err){
                res.send(err)
            }else{
                res.send("添加分类成功<a href='/admin/cats'>查看分类列表</a>")
            }
        })
    })
})
router.post('/edit',function(req,res,next){
    var title = req.body.title
    var sort = req.body.sort
    var id = req.body.id
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('cats')
        c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function(err,result){
            if(err){
                res.send(err)
            }else{
                res.send("更新成功<a href='/admin/cats'>返回分类列表</a>")
            }
        })
    })
})
router.get('/delete',function(req,res){
    var id = req.query.id
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return
        }
        var c = db.collection('cats')
        c.remove({_id:ObjectId(id)},function(err,result){
            if(err){
                res.send(err)
                return
            }
            res.redirect('/admin/cats')
        })
    })
})

module.exports = router