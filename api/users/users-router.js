const router = require("express").Router();
const User = require('./users-model');

router.get('/',(req,res)=>{
    User.find()
        .then(users=>{
            res.status(200).json(users)
        }).catch(error=>{
            res.status(400).json({message:error.message})
        })
})


module.exports= router;
