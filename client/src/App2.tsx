import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App2() {
	const [apiResponse, setApiResponse] = useState('');

	const callAPI = () => {
		fetch('users')
			.then((res) => res.text())
			.then((res) => setApiResponse(res));
	};
	useEffect(() => {
		callAPI();
	}, []);

	const login = () => {
		const qParams = [
			`client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
			`redirect_uri=${process.env.REACT_APP_SERVER_URL}/users/finalizeExternalLogin`,
			`approval_prompt=force`,
			`response_type=code`,
			`scope=activity:read_all`
		].join('&');
		try {
			window.open(`oauth/authorize?${qParams}`);
		} catch (e) {
			console.error(e);
		}
	};
	const logout = () => {
		const fetchLogout = async () => {
			const user = await fetch('users/logout');
			console.log(user);
		};
		fetchLogout();
	};
	return (
		<div className="App">
			<BrowserRouter>
				<Route exact path="/">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<p className="App-intro">{apiResponse}</p>
						{apiResponse ? (
							<button onClick={() => logout()}>Log out</button>
						) : (
							<button onClick={() => login()}>Log in</button>
						)}
					</header>
				</Route>
			</BrowserRouter>
		</div>
	);
}

export default App2;
