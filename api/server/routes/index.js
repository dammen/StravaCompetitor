import express from 'express';
import path from 'path';

var router = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

export default router;
