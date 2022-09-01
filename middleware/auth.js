// Protecting todo route, checks to see if someone is logged in. 

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) { // checks if user authenticated  
        return next() // if they are, goes to next piece of middleware
      } else {
        res.redirect('/') // if not, go back to homepage
      }
    }
  }
  