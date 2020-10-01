const { db } = require('../connection')

module.exports = {
    getallkaryawan: (req,res)=>{
        db.query('SELECT * FROM karyawan',(err,result)=>{
            if(err){ return res.status(500).send(err) }
            res.status(200).send(result)
        })
    }
}