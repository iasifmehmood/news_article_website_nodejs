const { addStory } = require('../model/storyModel');

exports.stories = (req, res) => {
  res.render('stories/add');
};

exports.addStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await addStory(req.body);
    res.render('dashboard');
    // console.log(req.body.user);
    // console.log(req.user.id);
    // console.log(req.body, req.body.user);
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};
