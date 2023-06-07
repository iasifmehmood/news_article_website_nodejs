exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

exports.isGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    return next();
  }
};
