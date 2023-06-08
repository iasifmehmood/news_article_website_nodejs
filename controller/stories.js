const { addStory, getPublicStories } = require('../model/storyModel');

exports.stories = (req, res) => {
  res.render('stories/add');
};

exports.addStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    let user = req.body.user;
    await addStory(req.body, user);
    res.render('dashboard');
    // console.log(req.body.user);
    // console.log(req.user.id);
    // console.log(req.body, req.body.user);
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};

exports.getPublicStories = async (req, res) => {
  try {
    const stories = await getPublicStories();
    res.render('stories/index', {
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};
