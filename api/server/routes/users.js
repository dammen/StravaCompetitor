import express from 'express';
import {
	getUser,
	finalizeExternalLogin,
	logout,
	initiateExternalLogin
} from '../controllers/userController.js';

var router = express.Router();

router.get('/', getUser);

router.get('/login', initiateExternalLogin);

router.get('/logout', logout);

router.get('/finalizeExternalLogin', finalizeExternalLogin);

module.exports = router;
