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

exports.getAllStories = async userID => {
  return QueryDB('select * from stories WHERE user_id=?', [userID]);
};

exports.getPublicStories = async () => {
  const status = 'public';
  return QueryDB(
    'SELECT *, stories.id AS story_id FROM stories INNER JOIN users ON stories.user_id = users.id WHERE stories.status =?',
    [status]
  );

  // return QueryDB('select * from stories where status = ?', [status]);
};

exports.getSingleStory = async storyId => {
  return QueryDB('select * from stories where id = ?', [storyId]);
};

exports.editStory = async storyId => {
  return QueryDB('select * from stories where id = ?', [storyId]);
};

exports.getStoryID = async storyId => {
  return QueryDB('select * from stories where id = ?', [storyId]);
};

exports.getStoriesByUser = userId => {
  const status = 'public';
  return QueryDB('SELECT * FROM stories WHERE user_id = ? AND status = ?', [
    userId,
    status,
  ]);
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
