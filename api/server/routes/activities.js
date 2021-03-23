import express from 'express';
/* import { getActivities } from '../controllers/activities';
import Model from '../models/model';
const messagesModel = new Model('activites'); */
const router = express.Router();

export default router.get('/activities', (req, res, next) => {
	res.send('respond with a resource');

	// TODO
	// Access the provided 'page' and 'limt' query parameters
	/*   let code = req.query.code;
  let scope = req.query.scope;
  if (code && scope && scope.length > 0) {
    getActivities(req, res)
  }
 */
});
