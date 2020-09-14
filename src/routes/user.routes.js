const express=require('express')
const User=require('../models/user')
const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
app.get('/user', (req, res) =>{

    let desde=req.query.desde || 0;
    desde=Number(desde)
    let limite= req.query.limite || 5;
    limite = Number(limite);

    User.find({estado : true},'fullname email role estado country img')
            .skip(desde)
            .limit(limite)
            .exec((err,usuarios)=>{
                if (err) {
                    return res.status(400).json({
                        ok : false ,
                        err
                    })
                }
                User.count({estado :true},(err,conteo)=>{
                    res.json({
                        ok:true,
                        cuantos:conteo,
                        usuarios:usuarios
                    }) 
                })
            
            })

});
//crear
app.post('/user/register', function(req, res) {

    let body = req.body;
    let user= new User({
        fullname: body.fullname,
        email: body.email,
        country:body.country,
        password : bcrypt.hashSync(body.password,10),
        role : body.role


    })
    user.save((err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            usuario : usuarioDB

        })
    })
   

});
//actualizar
app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body,['fullname','lema','type','actividad','aparece']);
    User.findByIdAndUpdate(id ,body,{new : true ,runValidators:true} , (err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        res.json({
            ok:true, 
            usuario:usuarioDB
        });

    })
    
});
app.get('/user/:id',async (req,res)=>{
  const {id} =req.params;
  const user= await User.findById(id)
  res.json({
     user});
});
app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role], function(req, res) {
    let id =req.params.id;
//    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
    let cambioEstado = {
        estado : false
    };
    Usuario.findByIdAndUpdate(id,cambioEstado,{new:true},(err,usuarioBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        };
        if (!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                error : {
                    message: 'usuario no encontrado'
                }
                
            })
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
});
module.exports=app;