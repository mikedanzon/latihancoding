const { db } = require('../connection')

module.exports = {
    getallkaryawan: (req,res)=>{
        var { page } = req.query
        var sql
        if (page) {
            page = parseInt(page)
            sql = `SELECT * FROM karyawan limit ${(page-1)*5},5` // 5 = jumlah tiap page
        } else {
            sql = 'SELECT * FROM karyawan'
        }
        db.query(sql,(err,result)=>{
            if(err){ return res.status(500).send(err) }
            res.status(200).send(result)
        })
    }
}