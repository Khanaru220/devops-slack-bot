import {
	composeBlockMessageForOpenAI,
	generateOneAIResponse,
} from '../utils/openAI.js';
import formatSlackMarkdown from '../utils/formatSlackMarkdown.js';
import { replaceSubstring } from '../utils/stringUtils.js';
import { getUserPersonaConfig } from '../utils/getUserPersonaConfig.js';

const registerMessageEvent = (app) => {
	app.event('message', async ({ payload, say, context, client, event }) => {
		if (payload.channel_type !== 'im') return; // only listen DM message

		console.log('listen message DM');

		const { channel, ts, thread_ts, text, channel_type, user } = payload;

		// Reaction to message to indocate model has read
		await client.reactions.add({
			token: process.env.SLACK_BOT_TOKEN,
			name: 'recycle',
			channel,
			timestamp: ts,
		});

		const personaConfig = await getUserPersonaConfig({
			client,
			channel_id: channel,
		});

		const systemPrompt = composeBlockMessageForOpenAI({
			role: 'system',
			text: `${
				personaConfig.prompt ? `# INSTRUCTION:\n${personaConfig.prompt}` : ''
			}
			${
				personaConfig.knowledge
					? `# ABOUT YOUR PARTNER:\n${personaConfig.knowledge}`
					: ''
			}
			${
				personaConfig.language
					? `# RULES:
			- Always answer in ${personaConfig.language}
			------`
					: ''
			}
			`,
		});

		const thread = await client.conversations.replies({
			channel,
			ts: thread_ts ? thread_ts : ts,
		});

		const arrayMessages = thread?.messages
			?.slice(thread?.messages.length <= 20 ? 0 : thread?.messages.length - 20)
			.map((message) => {
				return composeBlockMessageForOpenAI({
					text: replaceSubstring(
						message.text,
						`<@${process.env.SLACK_BOT_UID}>`,
						''
					),
					role: message.bot_id ? 'assistant' : 'user',
				});
			});

		if (channel_type !== 'im') return; //only work with DM message to Slack App

		const outputAIMessage = await generateOneAIResponse({
			arrayMessages: [systemPrompt, ...arrayMessages],
		});

		// Remove reaction to message to indocate model has read
		await client.reactions.remove({
			token: process.env.SLACK_BOT_TOKEN,
			name: 'recycle',
			channel,
			timestamp: ts,
		});

		await say({
			text: formatSlackMarkdown(outputAIMessage),
			thread_ts: thread_ts ? thread_ts : ts,
		});
	});
};

export default registerMessageEvent;
