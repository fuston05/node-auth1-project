const db = require('../dataBase/db_config');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return db('users').select('id', 'username');
}//end ifnd

function findBy(filter){
  return db('users').where(filter);
}//end findBy

function findById(id){
  return db('users')
  .where({id})
  .select('id', 'username')
  .first();
}//findById

async function add(user){
  const [id] = await db('users')
  .insert(user, 'id');
  return findById(id);
}//end register