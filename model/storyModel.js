const QueryDB = require('../config/db_config.js');

exports.addStory = async (story, user) => {
  //   console.log(story, user);
  const { title, body, status } = story;
  // console.log(title, body, status, user);
  return QueryDB(
    'INSERT into stories (title, body, status, user_id) values(?,?,?,?) ',
    [title, body, status, user]
  );
};

exports.getAllStories = async () => {
  return QueryDB('select * from stories');
};

exports.getPublicStories = async () => {
  const status = 'public';
  return QueryDB('select * from stories where status = ?', [status]);
};

exports.editStory = async storyId => {
  return QueryDB('select * from stories where id = ?', [storyId]);
};

exports.updateStory = (storyData, storyId) => {
  const { title, body, status } = storyData;
  return QueryDB('Update stories SET title=?, body=?, status=? where id=? ', [
    title,
    body,
    status,
    storyId,
  ]);
};

exports.deleteUser = async storyId => {
  return QueryDB(`delete from stories where id = ?`, [storyId]);
};

// exports.updateStory = async (vals, storyId) => {
//   let query = 'update users SET ';
//   let queryParams = [];
//   let fieldsToUpdate = [];

//   for (const [key, value] of Object.entries(vals)) {
//     fieldsToUpdate.push(`${key} = ?`);
//     queryParams.push(value);
//   }
//   query += fieldsToUpdate.join(', ');
//   query += ' WHERE id = ?';
//   queryParams.push(storyId);

//   return QueryDB(query, queryParams);
// };

// exports.getAllUsers = async () => {
//   return QueryDB('select * from users');
// };
// exports.getSingleUser = async userId => {
//   return QueryDB('select * from users where id = ?', [userId]);
// };

// exports.updateStory = async (vals, storyId) => {
//   let query = 'update users SET ';
//   let queryParams = [];
//   let fieldsToUpdate = [];

//   for (const [key, value] of Object.entries(vals)) {
//     fieldsToUpdate.push(`${key} = ?`);
//     queryParams.push(value);
//   }
//   query += fieldsToUpdate.join(', ');
//   query += ' WHERE id = ?';
//   queryParams.push(storyId);

//   return QueryDB(query, queryParams);
// };

// exports.deleteUser = async userId => {
//   return QueryDB(`delete from users where id = ?`, [userId]);
// };
