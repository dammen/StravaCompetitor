const a = (req, res) => {
    var options = {
      url: `http://www.strava.com/api/v3/athlete/activities?${params}`,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };
  
    request.get(options, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            console.log(locals)
        }
    })
  }

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