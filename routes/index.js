const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const MailController = require("../controllers/mailController")
const authentication = require("../middlewares/authentication")



router.post("/mail", authentication, MailController.createMail)
router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.get("/mail/:id", authentication, MailController.findMail)


module.exports = router