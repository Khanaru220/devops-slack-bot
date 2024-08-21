import {
	getLogoBlock,
	getWelcomeSectionBlock,
	getDividerBlock,
	getInputBlock,
	getActionsBlock,
	getButtonElement,
	getNumberInputBlock,
} from '../config/blocks.js';

import { defaultPersonaConfig } from '../config/schema.js';

const generateHomeView = ({
	userId,
	logoUrl,
	appUrl,
	welcomeMessage,
	channel_id,
	personaConfig = defaultPersonaConfig,
}) => {
	return {
		user_id: userId,
		view: {
			type: 'home',
			callback_id: `home_view_${channel_id}`,
			blocks: [
				getActionsBlock([
					getButtonElement({
						text: 'Go to Messages',
						actionId: 'navigate_to_messages',
						url: appUrl,
						value: channel_id,
					}),
				]),
				getDividerBlock(),
				getInputBlock(
					'persona_prompt_block',
					'persona_prompt',
					'What do you want the persona to do? (system prompt)',
					true,
					personaConfig.prompt
				),
				getInputBlock(
					'persona_knowledge_block',
					'persona_knowledge',
					'Which things do you want the persona to know about you?',
					true,
					personaConfig.knowledge
				),
				getInputBlock(
					'persona_language_block',
					'persona_language',
					'Which language do you want the persona to respond in?',
					true,
					personaConfig.language
				),
				getActionsBlock([
					getButtonElement({
						text: `Save Config `,
						actionId: 'submit_persona_config',
						style: 'primary',
						value: channel_id,
					}),
				]),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),
				getDividerBlock(),

				getWelcomeSectionBlock('Advanced settings'),
				getInputBlock(
					'persona_config_model_block',
					'persona_model',
					'model',
					false,
					personaConfig.model
				),
				getNumberInputBlock(
					'persona_temperature_block',
					'persona_temperature',
					'temperature',
					personaConfig.temperature
				),
				getNumberInputBlock(
					'persona_max_tokens_block',
					'persona_max_tokens',
					'max_tokens',
					personaConfig.max_tokens
				),
				getNumberInputBlock(
					'persona_top_p_block',
					'persona_top_p',
					'top_p',
					personaConfig.top_p
				),
				getNumberInputBlock(
					'persona_frequency_penalty_block',
					'persona_frequency_penalty',
					'frequency_penalty',
					personaConfig.frequency_penalty
				),
				getNumberInputBlock(
					'persona_presence_penalty_block',
					'persona_presence_penalty',
					'presence_penalty',
					personaConfig.presence_penalty
				),
				getDividerBlock(),
			],
		},
	};
};

export { generateHomeView };
