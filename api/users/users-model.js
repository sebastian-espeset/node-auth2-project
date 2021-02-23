const db = require("../../database/connection.js");

function find() {
    return db("users as u")
    .select("u.user_id","u.username","u.department")

  }

function findById(id) {
    return db("users as u")
    .select("u.user_id","u.username","u.department")
      .where("u.user_id", id)
      .first();
  }

async function add(newUser){
    const [id]=await db("users").insert(newUser,"id")
    return findById(id)
}

module.exports ={
    find,
    add
}