const User = require('./models/user')

module.exports = (app) => {
  app.get('/', function (req, res) {
    User.find(function (err, user) {
      if (err) {

      } else {
        res.send(user)
      }
    })
  })
  app.post('/login', function (req, res) {
    console.log(req.body)
    res.send('email: ' + req.body.email + ' , password :' + req.body.password)
  })
  app.post('/login', passport.authenticate('login', {
		successRedirect: '/index',
		failureRedirect: '/',
		failureFlash : true
	}))
}
