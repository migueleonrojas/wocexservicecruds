var mongoose = require('mongoose');
var schema = mongoose.Schema;  


var transaccionschema = new schema(
    {
        Name: String,
        Description: String,
        Estatus: String,   
        Id: String
    }
);

module.exports = mongoose.model('Task', transaccionschema);