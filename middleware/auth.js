const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const worker = await Worker.findById(decoded.id);
    
    if (!worker) {
      return res.status(401).json({ message: "Ruxsat yo'q" });
    }
    
    req.worker = worker;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token noto'g'ri" });
  }
};