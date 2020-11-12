import express from 'express';
import { messagesPage, addMessage } from '../controllers/messages.js';
import path from 'path';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});


router.get('/messages', messagesPage);

router.post('/messages', addMessage);


export default router;
