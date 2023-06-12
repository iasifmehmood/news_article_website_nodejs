const { getImageFromUser } = require('../Model/usermodel');
const {
  addStory,
  getPublicStories,
  editStory,
  updateStory,
  deleteUser,
  getSingleStory,
  getStoriesByUser,
  getAllStories,
} = require('../model/storyModel');

exports.stories = (req, res) => {
  res.render('stories/add');
};

exports.addStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    let user = req.body.user;
    await addStory(req.body, user);
    res.redirect('/dashboard');
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
    // const image = await getImageFromUser(req.user.id);
    // const img = image[0].image;
    const stories = await getPublicStories();
    console.log(stories);
    res.render('stories/index', {
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};

exports.getSingleStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    let storyId = req.params.id;
    let story = await getSingleStory(storyId);
    if (!story) {
      return res.render('error/404');
    }
    const storyUserId = story[0].user_id;
    const storyy = story[0];
    // console.log(story[0]);
    // console.log(story[0].user_id);
    if (storyUserId != req.user.id && storyy.status == 'private') {
      res.render('error/404');
    } else {
      res.render('stories/show', {
        storyy,
      });
    }
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
    // console.log(storyy);
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

exports.updateStory = async (req, res) => {
  try {
    // req.body.user = req.user.id;
    let storyId = req.params.id;
    // const story = await updateStory(req.body, storyId);
    const story = await editStory(storyId);
    if (!story) {
      return res.render('error/404');
    }
    const storyUserId = story[0].user_id;
    // console.log(story[0]);
    // console.log(story[0].user_id);
    if (storyUserId != req.user.id) {
      res.redirect('/stories');
    } else {
      await updateStory(req.body, storyId);
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};

exports.deleteStory = async (req, res) => {
  try {
    let storyId = req.params.id;
    await deleteUser(storyId);
    return res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};

exports.getStoriesByUser = async (req, res) => {
  try {
    let userId = req.params.id;
    const stories = await getStoriesByUser(userId);
    return res.render('stories/index', {
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render(error / 500);
  }
};
