const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class UserController {
    static login(req,res,next){
        User.findOne({where: {
            email: req.body.email
        }})
        .then(data => {
            if(data){
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                if(compare(req.body.password, data.password)){
                    res.status(200).json({ access_token }) 
                } else {
                    throw {
                        status: 401,
                        message: "email/password salah"
                    }
                }       
            } else {
                throw {
                    status: 401,
                    message: "email tidak terdaftar"
                }
            }      
        })
        .catch(error => {
            next(error)
        })
    }

    static register (req,res,next) {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            divisi: req.body.divisi
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                id: data.id,
                name: data.name,
                email: data.email,
                divisi: data.divisi
            })
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = UserController