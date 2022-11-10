const mongose = require('mongoose');
const { Schema } = mongose;
const bcrypt = require('bcrypt');
require('dotenv').config;


const LoginSchema = new Schema({
    usuario: {type: String, require: true},
    Contraseña:{type: String,require:true},
    Gmail:{type: String,require:true},
    rol:{type: String,require:true},

});

LoginSchema.methods.encryptPassword = async Contraseña =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(Contraseña,salt);
} 

LoginSchema.methods.confirmPassword = function(Contraseña){
    console.log(Contraseña);
    return bcrypt.compare(Contraseña, this.Contraseña);
}

module.exports = mongose.model('Login',LoginSchema);
