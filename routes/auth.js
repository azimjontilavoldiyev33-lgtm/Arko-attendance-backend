const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');

router.post('/login', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const worker = await Worker.findOne({ phoneNumber });
    
    if (!worker) {
      return res.status(404).json({ message: "Ishchi topilmadi" });
    }
    
    const token = jwt.sign(
      { id: worker._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({ token, worker });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;