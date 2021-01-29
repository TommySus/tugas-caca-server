const { Mail, User } = require('../models')

class MailController {
    static createMail (req, res, next) {
        const obj = {
            kepada: req.body.kepada,
            perihal: req.body.perihal,
            keterangan: req.body.keterangan,
            instansi: req.body.instansi,
            jenisSurat: req.body.jenisSurat,
            UserId: req.loggedInUser.id
        }
        Mail.create(obj)
        .then(data1 => {
            let month = data1.createdAt.toISOString().slice(5,7)
            let day =  data1.createdAt.toISOString().slice(8,10)
            let year = data1.createdAt.toISOString().slice(0,4)
            return Mail.findOne({where: {id: data1.id}, include: User})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    kepada: data.kepada,
                    perihal: data.perihal,
                    instansi: data.instansi,
                    jenisSurat: data.jenisSurat,
                    namaPenanggungJawab: data.User.name,
                    instansiPenanggungJawab: data.User.divisi,
                    emailPenanggungJawab: data.User.mail,
                    tanggalDiBuat: data.createdAt.toISOString().slice(0,10),
                    nomorSurat: `${data.jenisSurat}/${data.id}/${data.instansi}/PKP/${day}.${month}/${year}`
                })
            })
            .catch(error => {
                next(error)
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static findMail (req, res, next) {
        Mail.findOne({where: {id: req.params.id}, include: User})
        .then(data => {
            if (data) {
                res.status(200).json({
                    id: data.id,
                    kepada: data.kepada,
                    perihal: data.perihal,
                    jenisSurat: data.jenisSurat,
                    namaPenanggungJawab: data.User.name,
                    instansiPenanggungJawab: data.User.divisi,
                    emailPenanggungJawab: data.User.mail,
                    tanggalDiBuat: data.createdAt.toISOString().slice(0,10)
                })
            } else {
                throw {
                    status: 404,
                    message: 'surat dengan nomor tersebut tidak di temukan'
                }
            }
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = MailController