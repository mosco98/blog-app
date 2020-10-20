const router = require('express').Router()

const User = require('../models/User')
const userController = require('../controllers/user')
const postController = require('../controllers/post')
const { isAuthenticated } = require('../config/passport')

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/logout', userController.userLogout)

router.use('/user', isAuthenticated)

router.get('/user', userController.getUser)

router.use('/posts', isAuthenticated)

router.get('/posts', postController.getPosts)

router.post('/posts/add', postController.addPost)

router.get('/posts/:id', postController.getPost)

router.delete('/posts/:id', postController.deletePost)

router.post('/posts/:id/edit', postController.updatePost)

module.exports = router
