const db= require('../dataBase/db_config');

module.exports= {
  find
}

function find(){
 return db('users');
}//end ifnd