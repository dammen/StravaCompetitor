import express from 'express';
import Model from '../models/model';
const messagesModel = new Model('messages');
const router = express.Router();

export default router.get('/', function (req, res, next) {
  (async () => {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  })();
});

