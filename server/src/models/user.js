var bCrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	// id: String,
	username: { type : String , unique : true, required : true },
	password: {type: String, set: createHash},
	email: String,
	firstName: String,
	lastName: String,
	roleid: String
})

module.exports = mongoose.model('User',UserSchema)

function createHash(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
