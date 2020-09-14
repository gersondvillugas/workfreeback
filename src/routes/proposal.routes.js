
const express=require('express')
const Proposal=require('../models/Proposal')
//const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
//const project = require('../models/project');
app.post('/add/project', function(req, res) {

  let body = req.body;
  let proposal= new Proposal({
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