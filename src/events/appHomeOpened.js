import { getUserPersonaConfig } from '../utils/getUserPersonaConfig.js';
import { generateHomeView } from '../utils/generateHomeView.js';

const registerAppHomeOpenedEvent = (app) => {
	try {
		app.event('app_home_opened', async ({ payload, message, say, client }) => {
			console.log('listen app_home_opened');

			const { user, channel } = payload;

			const personaConfig = await getUserPersonaConfig({
				client,
				channel_id: channel,
			});

			const result = await client.views.publish(
				generateHomeView({
					userId: user,
					appUrl: `slack://app?id=${process.env.SLACK_BOT_APP_ID}&tab=messages`,
					logoUrl:
						'https://res.cloudinary.com/dv5scuxib/image/upload/w_150,c_fill,ar_1:1,g_auto,b_rgb:262c35/v1719556763/airtable_Persona%20Inside%20Sales%20Agent__1719556763586.jpg',
					welcomeMessage: '*Welcome to the Persona Configuration!*',
					personaConfig,
					channel_id: channel,
				})
			);

			console.log(result);
		});
	} catch (error) {
		console.error(error);
	}
};

export default registerAppHomeOpenedEvent;
