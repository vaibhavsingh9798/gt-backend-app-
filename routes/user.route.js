const express = require('express')
const {signup,login,getUsers,updateUser} = require('../controllers/user.controller.js')
const {verifyJWT} = require('../middlewares/auth.middleware.js')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/',verifyJWT,getUsers)
router.patch('/:id',verifyJWT,updateUser)
router.delete('/:id',verifyJWT)

module.exports = router 