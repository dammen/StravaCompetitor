import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Authorizer } from './Authorizer';
import { Athlete, SummaryActivity } from './types/strava';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const [activities, setActivities] = useState<SummaryActivity[]>([]);
  const qParams = [
    `client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
    `redirect_uri=http://localhost:3000/authorize`,
    `approval_prompt=force`,
    `response_type=code`,
    `scope=activity:read_all`,
  ].join('&');

  const callAPI = () => {
    fetch('localApi')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  useEffect(() => {
    callAPI();
  }, []);

  const athleteAsString: string | null = localStorage.getItem(
    'athlete',
  );
  const athlete: Athlete | null = athleteAsString
    ? JSON.parse(athleteAsString)
    : null;

  const expiresAt: number =
    parseInt(localStorage.getItem('expires_at') || '') * 1000;
  const expiresAtAsString: string = new Date(
    expiresAt,
  ).toDateString();
  const refreshToken: string | null = localStorage.getItem(
    'refresh_token',
  );
  const accessToken: string | null = localStorage.getItem(
    'access_token',
  );

  const renewToken = () => {
    const qParamsRefresh = [
      `client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
      `client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}`,
      `grant_type=refresh_token`,
      `refresh_token=${refreshToken}`,
    ].join('&');
    fetch(`oauth/token?${qParamsRefresh}`, { method: 'POST' })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token_type', res.token_type);
        localStorage.setItem('expires_at', res.expires_at);
        localStorage.setItem('expires_in', res.expires_in);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('access_token', res.access_token);
      });
  };
  const handleGoogleLogin = useCallback(async () => {
    try {
      window.open(`oauth/authorize?${qParams}`);

      /*     const response = await fetch(`oauth/authorize?${qParams}`, {headers: {"Access-Control-Allow-Origin": "*"}});
       const url = await response.text();
      console.log(url)
      window.location.assign(url);  */
    } catch (e) {
      console.error(e);
    }
  }, [qParams]);

  const getActivity = () => {
    if (!accessToken) {
      console.warn('no access token available. Log in first');
    }
    if (expiresAt < Date.now()) {
      renewToken();
    }
    const after = new Date();
    after.setMonth(after.getMonth() - 1);
    const afterAsMs = after.getTime() / 1000;
    const before = new Date().getTime() / 1000;
    const params = [
      `before=${before}`,
      `after=${afterAsMs}`,
      `page=1`,
      `per_page=30`,
    ].join('&');

    fetch(`api/v3/athlete/activities?${params}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((res) => res.text())
      .then((res) => {
        localStorage.setItem('activities', res);
        setActivities(JSON.parse(res));
      });
  };

  useEffect(() => {
    let interval: number | null = null;
    if (!athlete) {
      interval = window.setInterval(() => {
        const check = localStorage.getItem('athlete');
        if (check) {
          window.location.reload();
        }
      }, 500);
    }
    return (): void => {
      interval && window.clearInterval(interval);
    };
  }, [athlete]);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="App-intro">{apiResponse}</p>
            {athlete && refreshToken !== 'undefined' ? (
              <>
                <div>{'welcome ' + athlete.firstname}</div>
                <div>{'Token expires at ' + expiresAtAsString}</div>

                <button onClick={() => getActivity()}>
                  {activities
                    ? 'Oppdater aktiviter'
                    : 'Hent aktiviter'}
                </button>
              </>
            ) : (
              <button onClick={() => handleGoogleLogin()}>
                Log in
              </button>
            )}
          </header>
          {activities && activities.length > 0 && (
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <li
                key="header-list-element"
                style={{
                  listStyleType: 'none',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <h2>Navn</h2>
                <h2>Type</h2>
                <h2>Dato</h2>
              </li>

              {activities.map((activity) => (
                <li
                  key={activity.external_id}
                  style={{
                    listStyleType: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: '1em',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <div>{activity.name}</div>
                  </div>
                  <div style={{ width: '100%' }}>
                    <div>{activity.type}</div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div>
                      {new Date(
                        activity.start_date_local,
                      ).toDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Route>
        <Route exact path="/authorize">
          <Authorizer></Authorizer>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
