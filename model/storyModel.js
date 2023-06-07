const QueryDB = require('../config/db_config.js');

exports.addStory = async story => {
  //   console.log(story, user);
  const { title, body, status, user } = story;
  console.log(title, body, status, user);
  const user_id = parseInt(user);
  return QueryDB(
    'INSERT into stories (title, body, status, user_id) values(?,?,?,?) ',
    [title, body, status, user_id]
  );
};

// exports.getAllUsers = async () => {
//   return QueryDB('select * from users');
// };
// exports.getSingleUser = async userId => {
//   return QueryDB('select * from users where id = ?', [userId]);
// };

// exports.updateUser = async (vals, userId) => {
//   let query = 'update users SET ';
//   let queryParams = [];
//   let fieldsToUpdate = [];

//   if (vals.password) vals.password = await bcrypt.hash(vals.password, 13);

//   for (const [key, value] of Object.entries(vals)) {
//     fieldsToUpdate.push(`${key} = ?`);
//     queryParams.push(value);
//   }
//   query += fieldsToUpdate.join(', ');
//   query += ' WHERE id = ?';
//   queryParams.push(userId);

//   return QueryDB(query, queryParams);
// };

// exports.deleteUser = async userId => {
//   return QueryDB(`delete from users where id = ?`, [userId]);
// };
