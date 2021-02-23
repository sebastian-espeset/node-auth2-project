const db = require("../../database/connection.js");

function find(){
    return db("users as u")
}

module.exports ={
    find
}