const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const {isValid}= require("../services/isValid")
const Users = require("../users/users-model.js");

router.post('/register',(req,res)=>{
    const credentials = req.body
    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 10;
        
        //here's where we hash the pw
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        //here's where we save to user to the database
        Users.add(credentials)
            .then((user)=>{
                res.status(200).json({data:user })
            }) .catch((error)=>{
                res.status(400).json({message:error.message})
            })
    } else{
        res.status(400).json("please provide all required information")
    }
})
module.exports = router;