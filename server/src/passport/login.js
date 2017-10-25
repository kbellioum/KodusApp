const LocalStrategy   = require('passport-local').Strategy
const User = require('../models/user')
const bCrypt = require('bcrypt-nodejs')
// const log = require('../libs/log.js')

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err) {
											  // log('Login', 'Echec d\'authentification. Erreur système .','-')
                        return done(err)
                    // Username does not exist, log the error and redirect back
									 }
                    if (!user){
                        //console.log('User Not Found with username '+username);
												// log('Login', 'Echec d\'authentification. Utilisateur introuvable .','-')
                        return done(null, false, req.flash('message', 'Oops Erreur 1'))
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        //console.log('Invalid Password');
												// log('Login', 'Echec d\'authentification. Utilisateur ou mot de passe incorrect .','-')
                        return done(null, false, req.flash('message', 'Oops Erreur 2')) // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user)
                }
            )

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password)
    }

}
