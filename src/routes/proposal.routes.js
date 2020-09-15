const express=require('express')
const Proposal=require('../models/Proposal')
//const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
//const project = require('../models/project');
app.post('/add/proposal', function(req, res) {

  let body = req.body;
  let proposal= new Proposal({
      detail: body.detail,
      user:req.body.user,
      project: body.project,
     // context:body.context,
      timerequired:body.timerequired,
      budget:body.budget,
      
      //password : bcrypt.hashSync(body.password,10),
      //role : body.role


  })
  proposal.save((err,proposalDB)=>{
      if (err) {
          return res.status(400).json({
              ok : false ,
              err
          })
      }
      //usuarioDB.password=null;
      res.json({
          ok:true,
          proposal : proposalDB

      })
  })
 

});
 
app.get('/proposal/:project',function(req, res) { 
    let project= req.params.project;

    Proposal.find({project:project}  , (err,projectDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        res.json({
            proposal:projectDB
        });

    })
    
})
module.exports=app;