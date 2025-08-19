
module.exports = function (req, res, next) {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Accès interdit : admin seulement" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Erreur middleware admin", error: err.message });
  }
};
