var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var proposalSchema = new Schema({
    detail: { type: String, required: [true, 'la disponibilidad es necesario'] },
    //experience: { type: String, required: true },
   // example: { type: String, required: true },
 //   categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },

    //orderDate: { type: Date, default: Date.now() },
    timerequired:{type:String,required:true},
    budget:{type:String,required:true},
    img:{
        type:String ,
        require :false}
});


module.exports = mongoose.model('Proposal', proposalSchema);
