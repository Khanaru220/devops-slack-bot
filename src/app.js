// Ensure environment variables are loaded first
import './setup/setupEnv.js';

// Now, import other modules that depend on the environment variables
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { App } = require('@slack/bolt');
import { registerEvents } from './events/index.js';
import { registerFunctions } from './function/index.js';
import { registerShortcuts } from './shortcut/index.js';
import { fallbackPort } from './config/index.js';

// Configure and start the Slack app
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	customRoutes: [
		{
			path: '/',
			method: ['GET'],
			handler: (req, res) => {
				res.writeHead(200);
				res.end(`Things are going just fine at ${req.headers.host}!`);
			},
		},
	],
});

registerEvents(app);
registerFunctions(app);
registerShortcuts(app);

app.start(process.env.PORT || fallbackPort).then(() => {
	console.log(`Bolt is running on port ${process.env.PORT || fallbackPort}`);
});
