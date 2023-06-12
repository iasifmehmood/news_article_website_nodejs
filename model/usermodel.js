const QueryDB = require('../config/db_config.js');

exports.createUser = async (id, name, email, created_at, image) => {
  const data = [id, name, email, created_at, image];

  return QueryDB(
    'INSERT into users (id,name,email,created_at,image) values(?,?,?,?,?) ',
    data
  );
};

exports.checkUser = email => {
  return QueryDB('SELECT * FROM users WHERE email = ?', [email]);
};

exports.updateLastAccess = last_accessed => {
  console.log(last_accessed);
  return QueryDB(
    'UPDATE users SET last_accessed = ? WHERE email = ?',
    last_accessed
  );
};

exports.getUserDetails = email => {
  return QueryDB('SELECT * FROM stories WHERE email = ?', [email]);
};

// exports.getImageFromUser = userID => {
//   return QueryDB('SELECT * FROM USERS WHERE id= ?', [userID]);
// };
