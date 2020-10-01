const Router = require('express').Router()
const { db } = require('../connection')
const { KaryawanControllers } = require('../controllers')
const { getallkaryawan } = KaryawanControllers

Router.get('/',getallkaryawan) // ini contoh pake controllers ( ga enak contoh aja )

Router.post('/',(req,res)=>{
    var data = req.body
    var sql = 'INSERT INTO karyawan SET ?';
    db.query(sql,data,(err,results)=>{
        if(err){ return res.status(500).send(err) }
        db.query('SELECT * FROM karyawan',(err2,results2)=>{
            if(err2){ return res.status(500).send(err2) }
            res.status(200).send(results2)
        })
    })
})

Router.delete('/:id',(req,res)=>{
    db.query('DELETE FROM karyawan WHERE no = ?',[req.params.id],(err,result)=>{
        if(err){ return res.status(500).send(err) }
        db.query('SELECT * FROM karyawan',(err2,results2)=>{
            if(err2){ return res.status(500).send(err2) }
            res.status(200).send(results2)
        })
    })
})

Router.put('/:id',(req,res)=>{
    db.query('UPDATE karyawan SET ? WHERE no = ?',[req.body, req.params.id],(err,result)=>{
        if(err){ return res.status(500).send(err) }
        db.query('SELECT * FROM karyawan',(err2,results2)=>{
            if(err2){ return res.status(500).send(err2) }
            res.status(200).send(results2)
        })
    })
})

Router.get('/:id',(req,res)=>{
    db.query('SELECT * FROM karyawan WHERE NO= ?',[req.params.id],(err,result)=>{
        if(err){ return res.status(500).send(err) }
        res.status(200).send(result)
    })
})

module.exports = Router