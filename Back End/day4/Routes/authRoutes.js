const Router = require('express').Router()
const { db } = require('../connection')
const { encrypt } = require('../helpers')
const nodemailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'mikedanzon@gmail.com',
        pass: 'rhvzswovsleorvij'
    },
    tls: {
        rejectUnauthorized: false
    }
})

Router.post('/register',(req,res)=>{ // auth buat register
    const {username,password,email} = req.body
    let hashpassword = encrypt(password)
    db.query('SELECT * FROM users WHERE username = ?',[username],(err,datausers)=>{
        if(err){ return res.status(500).send(err) }
        if (datausers.length) {
            return res.status(500).send('username is taken')
        } else {
            var data = {
                username,
                password:hashpassword,
                email,
                lastlogin: new Date()
            }
            db.query('INSERT INTO users SET ?',[data],(err2,results2)=>{
                if(err2){ return res.status(500).send(err2) }
                // SELECT must not include PASSWORD or something crudential (this is just example)
                // AUTO login after register
                db.query('SELECT * FROM users WHERE id = ?',[results2.insertId],(err3,userslogin)=>{
                    if(err3){ return res.status(500).send(err3) }
                    const htmlrender = fs.readFileSync('index.html','utf-8')
                    const template = handlebars.compile(htmlrender) //return function
                    const htmlemail = template({name:userslogin[0].username})
                    transporter.sendMail({
                        from: "Cogan <mikedanzon@gmail.com>",
                        to: email,
                        subject: "Bang jago confirm email",
                        html: htmlemail
                        // html: "<h1>Silahkan confirm email bang jago <a>CONFIRM EMAIL</a></h1>"
                    },(err)=>{
                        if(err){ return res.status(500).send(err) }
                        res.status(200).send(userslogin[0])
                    })
                })
            })
        }
    })
})

Router.post('/login',(req,res)=>{ // auth buat login
    const { username, password } = req.body
    let hashpassword = encrypt(password)
    db.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,hashpassword],(err,datausers)=>{
        if(err){ return res.status(500).send(err) }
        if (!datausers.length) {
            return res.status(300).send({message: 'User not found'})
        }
        var updateLogin = {
            lastlogin: new Date()
        }
        db.query('UPDATE users SET ? WHERE id = ?',[updateLogin,datausers[0].id],(err2,results2)=>{
            if(err2){ return res.status(500).send(err2) }
            return res.send(datausers[0])
        })
    })
})

module.exports = Router