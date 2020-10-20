const { response } = require('express')
const Post = require('../models/Post')

exports.addPost = (req, res) => {
  const { title, body } = req.body

  const { _id } = req.user

  const newPost = new Post({ title, body, user: _id })

  newPost.save((err) => {
    if (err) {
      return res.json({ error: true, msg: err.message })
    } else {
      return res.json({ success: true, msg: 'Saved successfully' })
    }
  })
}

exports.getPosts = (req, res) => {
  const { _id } = req.user

  Post.find({ user: _id })
    .sort('-updatedAt')
    .exec((err, response) => {
      if (err) {
        return res.json({ error: true })
      }

      return res.json({
        success: true,
        data: response
      })
    })
}

exports.getPost = (req, res) => {
  const { id } = req.params

  Post.findOne({ _id: id }).exec((err, response) => {
    if (err) {
      return res.json({ error: true })
    }

    return res.json({
      success: true,
      data: {
        _id: response._id,
        title: response.title,
        body: response.body,
        updatedAt: response.updatedAt,
        createdAt: response.createdAt
      }
    })
  })
}

exports.updatePost = (req, res) => {
  const { id } = req.params
  const { title, body } = req.body

  Post.findOneAndUpdate({ _id: id }, { title, body }, { useFindAndModify: false }).exec((err, response) => {
    if (err) {
      return res.json({ error: true })
    }

    return res.json({
      success: true
    })
  })
}

exports.deletePost = (req, res) => {
  const { id } = req.params

  Post.findOneAndDelete({ _id: id }).exec((err) => {
    if (err) {
      return res.json({ error: true })
    }

    return res.json({ success: true })
  })
}
