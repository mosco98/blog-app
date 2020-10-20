const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const bcrypt = require('bcryptjs')

const User = require('../models/User')

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = require('./keys').JWT_SECRET

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

/**
 * Passport auth for email and password
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match User
    User.findOne({ email }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Account does not exist' })
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err

        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      })
    })
  })
)

/**
 * jwt auth handling
 */
passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err, false)
      } else {
        return done(null, user)
      }
    })
  })
)

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(403).json({ error: true, msg: 'Authorization error' })
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }

      return next()
    })
  })(req, res, next)
}
