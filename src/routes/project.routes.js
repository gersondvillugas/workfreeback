const express=require('express')
const Project=require('../models/project')
//const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
const project = require('../models/project');
app.get("/project", async (req, res) => {
    Project.find({})
    
    
    .then(projects => {
        res.status(200).json({
            message: projects
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    })
  });
//crear
app.post('/add/project', function(req, res) {

    let body = req.body;
    let project= new Project({
        title: body.title,
        user:req.body.user,
        description: body.description,
        context:body.context,
        budget:body.budget,
        state:body.state,
        experience:body.experience,
        deadline:body.deadline,
        country:body.country
        //password : bcrypt.hashSync(body.password,10),
        //role : body.role


    })
    project.save((err,projectDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            project : projectDB

        })
    })
   

});
//obtener by id
app.get('/project/:id', function(req, res) {

    let id = req.params.id;
    
    Project.findById(id  , (err,projectDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        res.json({
            project:projectDB
        });

    })
    
});
app.get('/user/:id',async (req,res)=>{
  const {id} =req.params;
  const user= await User.findById(id)
  res.json({
     user});
});

module.exports=app;