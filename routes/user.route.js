const express = require('express')
const {signup,login,getUsers,updateUser,deleteUser} = require('../controllers/user.controller.js')
const {verifyJWT} = require('../middlewares/auth.middleware.js')
const router = express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.get('/',verifyJWT,getUsers);
router.patch('/:id',verifyJWT,updateUser);
router.delete('/:id',verifyJWT,deleteUser);

module.exports = router 