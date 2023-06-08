const {
  addStory,
  getPublicStories,
  editStory,
} = require('../model/storyModel');

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

exports.editStory = async (req, res) => {
  try {
    // req.body.user = req.user.id;
    let storyId = req.params.id;
    // const story = await updateStory(req.body, storyId);
    const story = await editStory(storyId);
    if (!story) {
      return res.render('error/404');
    }
    const storyUserId = story[0].user_id;
    const storyy = story[0];
    // console.log(story[0]);
    // console.log(story[0].user_id);
    if (storyUserId != req.user.id) {
      res.redirect('/stories');
    } else {
      res.render('stories/edit', {
        storyy,
      });
    }

    // console.log(req.body.user);
    // console.log(req.user.id);
    // console.log(req.body, req.body.user);
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};
