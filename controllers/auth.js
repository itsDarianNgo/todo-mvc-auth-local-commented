const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

 exports.getLogin = (req, res) => { // When someone clicks on login button on homepage
    if (req.user) {                 // if already logged in 
      return res.redirect('/todos') // send to todos page
    }
    res.render('login', { // renders login page
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => { // if someone actually logging in 
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) // checks if email field is not empty
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' }) // checks if password field is not empty
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => { // authenticates user against database
      if (err) { return next(err) }
      if (!user) { // if doesnt work send back to login page
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => { // if works, send to todos page
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => { // logout
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => { // destroys session
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/') // send back to homepage
    })
  }
  
  exports.getSignup = (req, res) => { // if click on signup page
    if (req.user) {                 // if already signed in
      return res.redirect('/todos') // redirect to todos page
    }
    res.render('signup', { // render signup page
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) // checks to see if email is entered | ex. "email@email.com" will work, "email" will not work
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' }) // validates password is atleast 8 characters long
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) // confirming password
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({ // creates new user in users collection on MongoDB
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [ // if user already exists, tell them it exists and try again
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {  // if user doesn't exist, we save it and send them into the todo list
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/todos')
        })
      })
    })
  }