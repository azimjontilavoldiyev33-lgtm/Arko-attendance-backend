const router = require('express').Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

router.post('/check-in', auth, async (req, res) => {
  try {
    const attendance = new Attendance({
      worker: req.worker.id,
      checkIn: new Date(),
      location: req.body.location
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/check-out', auth, async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      worker: req.worker.id,
      checkOut: null
    }).sort({ checkIn: -1 });
    
    if (!attendance) {
      return res.status(404).json({ message: "Faol sessiya topilmadi" });
    }
    
    attendance.checkOut = new Date();
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;