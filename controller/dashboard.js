const { getUserDetails } = require('../Model/usermodel');

exports.dashboard = async (req, res) => {
  console.log('reqqqqqqqqqqqqqqq', req.user);
  const email = req.user.email;
  // console.log(email);
  try {
    // const stories = await getUserDetails(email).lean();
    // console.log(stories);
    res.render('dashboard', {
      name: req.user.given_name,
      // stories,
    });
  } catch (error) {
    console.log(error);
    res.render('error/500');
  }
};
