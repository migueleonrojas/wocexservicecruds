var mongoose = require('mongoose');
var schema = mongoose.Schema;  


var Userschema = new schema(
    {
        id: String,
        mail: String,
        password: String,
        Create_at: { type: Date, require:true, default: Date.now },     
        
    }
);

module.exports = mongoose.model('UsuariosTask', Userschema);