import { FunctionComponent, useCallback, useEffect, useState } from 'react';

import React from 'react';
import { TokenPayload } from './types/strava';

export const Authorizer: FunctionComponent = () => {
	const [apiResponse, setApiResponse] = useState<TokenPayload | null>(null);

	const uri = window.location.href;
	const params = uri.split('&');
	const code = params.filter((p) => p.includes('code'))[0];
	const scope = params.filter((p) => p.includes('scope'))[0];

	if (scope.length > 0) {
		localStorage.setItem('scope', scope.split('=')[1]);
	}

	const renewToken = (refresh_token: string) => {
		const qParamsRefresh = [
			`client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
			`client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}`,
			`grant_type=refresh_token`,
			`refresh_token==${refresh_token}`
		].join('&');
		fetch(`oauth/token?${qParamsRefresh}`, { method: 'POST' })
			.then((res) => res.json())
			.then((res) => setApiResponse(res));
	};

	const fetchToken = useCallback(() => {
		let failed = false;

		const qParams = [
			`client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
			`client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}`,
			`code=${code.split('=')[1]}`,
			`grant_type=authorization_code`
		].join('&');

		fetch(`oauth/token?${qParams}`, { method: 'POST' })
			.then((res) => {
				if (!res.ok) {
					failed = true;
				}
				return res.json();
			})
			.then((res) => {
				if (failed) {
					if (
						res.errors[0].resource === 'AuthorizationCode' &&
						res.errors[0].code === 'expired'
					) {
						const refresh_token = res.refresh_token;
						if (refresh_token) {
							renewToken(refresh_token);
						}
					} else {
						console.warn(res);
					}
				} else {
					localStorage.setItem('token_type', res.token_type);
					localStorage.setItem('expires_at', res.expires_at);
					localStorage.setItem('expires_in', res.expires_in);
					localStorage.setItem('refresh_token', res.refresh_token);
					localStorage.setItem('access_token', res.access_token);
					localStorage.setItem('athlete', JSON.stringify(res.athlete));
					window.close();
				}
			});
	}, [code]);

	useEffect(() => {
		fetchToken();
	}, [fetchToken]);

	return <div>{apiResponse && 'Welcome ' + apiResponse.athlete.firstname}</div>;
};
