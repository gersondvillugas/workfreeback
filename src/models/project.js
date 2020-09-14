var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
    title: { type: String, required: [true, 'El nombre es necesario'] },
    description: { type: String, required: true },
    context: { type: String, required: true },
    budget: { type: Number, required: true },
    state: { type: String, required: true },
    experience: { type: String, required: true },
 //   categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now() },
    deadline:{type:Date,required:false},
    country:{type:String,required:true},
    img:{
        type:String ,
        require :false}
});


module.exports = mongoose.model('Project', projectSchema);
