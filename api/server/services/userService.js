import Model from '../models/model';

const userModel = new Model('users');

export const addUser = async (req, res, externalResponse, body) => {
	console.log(body);
	const {
		token_type,
		expires_at,
		expires_in,
		refresh_token,
		access_token,
		athlete
	} = body;
	const username = athlete.username;
	req.session.user = body;
	const columns =
		'token_type, expires_at, expires_in, refresh_token, access_token, username';
	const values = `'${token_type}', '${expires_at}','${expires_in}', '${refresh_token}', '${access_token}', '${username}'`;
	try {
		/* 	const data = await userModel.select(
				'*',
				`WHERE ${access_token} in user.access_token`
			);
			res.status(200).json({ messages: data.rows });
		} catch (err) {
			res.status(200).json({ messages: err.stack });
		} */

		// NB: creates duplicates
		await userModel.insertWithReturn(columns, values);
		res.redirect('http://localhost:3000');

		//res.status(200).json({ messages: data.rows });
	} catch (err) {
		console.log(err);
		res.status(200).json({ messages: err.stack });
	}
};

export const renewToken = (refresh_token) => {
	const qParamsRefresh = [
		`client_id=${process.env.CLIENT_ID}`,
		`client_secret=${process.env.STRAVA_CLIENT_SECRET}`,
		`grant_type=refresh_token`,
		`refresh_token=${refreshToken}`
	].join('&');
	fetch(`oauth/token?${qParamsRefresh}`, { method: 'POST' })
		.then((res) => res.json())
		.then((res) => {
			updateUser(res);
		});
};

export const updateUser = async (res) => {
	const {
		token_type,
		expires_at,
		expires_in,
		refresh_token,
		access_token,
		athlete
	} = res;
	const username = athlete.username;
	req.session.user = res;

	const columns =
		'token_type, expires_at, expires_in, refresh_token, access_token, username';
	const values = `'${token_type}', '${expires_at}','${expires_in}', '${refresh_token}', '${access_token}', '${username}'`;
	try {
		const data = await userModel.insertWithReturn(columns, values);
		res.status(200).json({ messages: data.rows });
	} catch (err) {
		res.status(200).json({ messages: err.stack });
	}
};
