const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')

const signAuthTokenWithId = (id) => jwt.sign({ id }, require('../config/keys').JWT_SECRET)

exports.userRegister = (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Fields cannot be empty' })
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (errors.length > 0) {
    res.send({ error: true, msg: errors[0].msg })
  }
  // Validation passed
  User.findOne({ email }).then((user) => {
    // User exists
    errors.push({ msg: 'User already exists' })
    if (user) {
      res.json({
        error: true,
        msg: errors[0].msg
      })
    } else {
      const newUser = new User({ name, email, password })

      // Hash password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          // Set password to hashed
          newUser.password = hash

          // Save user
          newUser
            .save()
            .then((userInfo) => {
              const token = signAuthTokenWithId(userInfo._id)

              res.json({
                success: true,
                msg: 'Account created',
                data: { token }
              })
            })
            .catch((err) => {
              if (err) {
                res.json({ error: true, msg: err.message })
              }
            })
        })
      )
    }
  })
}

exports.userLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({ error: true, msg: info.message })
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err)
      }

      const token = signAuthTokenWithId(user._id)

      return res.json({
        success: true,
        msg: 'Success! You are logged in.',
        data: { token }
      })
    })
  })(req, res, next)
}

exports.getUser = (req, res) => {
  const { _id } = req.user

  User.findOne({ _id }).exec((err, response) => {
    if (err) {
      return res.json({ error: true, msg: 'Network error' })
    }
    res.json({
      success: true,
      data: {
        name: response.name,
        email: response.email,
        date: response.date
      }
    })
  })
}

exports.userLogout = (req, res) => {
  req.logout()
}
