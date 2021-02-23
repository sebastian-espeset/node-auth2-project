const db = require("../../database/connection.js");

function find(){
    return db("users as u")
}
async function add(newUser){
    const [id]=await db("users").insert(newUser,"id")
    return db("users")
}

module.exports ={
    find,
    add
}