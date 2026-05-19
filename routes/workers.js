const router = require('express').Router();
const Worker = require('../models/Worker');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;