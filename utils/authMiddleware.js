exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.status(401).send("You are not authorized to view this resource.")
    }
}

exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.membership === true) {
    next();
  } else {
    res.status(403).send("Membership required.");
  }
};