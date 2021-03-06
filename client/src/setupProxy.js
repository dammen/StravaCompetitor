const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/users',
		createProxyMiddleware({
			target: 'http://localhost:9000',
			changeOrigin: true
		})
	);
	app.use(
		'/activities',
		createProxyMiddleware({
			target: 'http://localhost:9000',
			changeOrigin: true
		})
	);
	app.use(
		'/oauth',
		createProxyMiddleware({
			target: 'http://www.strava.com',
			changeOrigin: true
		})
	);
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://www.strava.com',
			changeOrigin: true
		})
	);
};
