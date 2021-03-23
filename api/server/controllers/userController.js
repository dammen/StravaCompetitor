import Model from '../models/model';
import { addUser, renewToken } from '../services/userService';
import request from 'request';
const userModel = new Model('users');

export const getUser = async (req, res) => {
	res.status(200).json(req.session.user);

	/* 		try {
			const data = await userModel.select(
				'*',
				`WHERE ${req.session.user.access_token} in user.access_token`
			);
			res.status(200).json({ messages: data.rows });
		} catch (err) {
			res.status(200).json({ messages: err.stack });
		}
	} else {
		res.status(200).json(null);
	} */
};

export const initiateExternalLogin = async (req, res) => {
	let userExists = false;
	if (req.cookies.access_token) {
		try {
			const data = await userModel.select(
				'*',
				`WHERE ${req.cookies.access_token} in user.access_token`
			);
			console.log(data);
			if (data) {
				userExists = true;
			}
			res.status(200).json({ messages: data.rows });
		} catch (err) {
			res.status(200).json({ messages: err.stack });
		}
	}
	if (!userExists) {
		const qParams = [
			`client_id=${process.env.CLIENT_ID}`,
			`redirect_uri=${process.env.SERVER_URL}/users/finalizeExternalLogin`,
			`approval_prompt=force`,
			`response_type=code`,
			`scope=activity:read_all`
		].join('&');
		try {
			res.redirect(`http://www.strava.com/oauth/authorize?${qParams}`);
		} catch (e) {
			console.error(e);
		}
	}
};

export const finalizeExternalLogin = async (req, res) => {
	let code = req.query.code;
	let scope = req.query.scope;
	if (code && scope && scope.length > 0) {
		const qParams = [
			`client_id=${process.env.CLIENT_ID}`,
			`client_secret=${process.env.STRAVA_CLIENT_SECRET}`,
			`code=${code}`,
			`grant_type=authorization_code`
		].join('&');

		var options = {
			url: `https://www.strava.com/oauth/token?${qParams}`
		};

		request.post(options, (err, response, body) => {
			if (!err && response.statusCode == 200) {
				var locals = JSON.parse(body);
				addUser(req, res, response, locals);
			} else {
				if (!response.ok) {
					if (
						response.errors[0].resource === 'AuthorizationCode' &&
						response.errors[0].code === 'expired'
					) {
						const refresh_token = response.refresh_token;
						if (refresh_token) {
							renewToken(refresh_token);
						}
					} else {
						console.warn(res);
					}
				} else {
					console.warn(err);
				}
			}
		});
	}
};

export const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/');
	});
};
