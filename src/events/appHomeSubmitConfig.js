import { defaultPersonaConfig } from '../config/schema.js';

const registerAppHomeSubmitConfigEvent = (app) => {
	try {
		app.action(
			'submit_persona_config',
			async ({ ack, body, client, payload, ...a }) => {
				try {
					await ack();

					console.log('listen submit_persona_config');

					const userId = body.user.id;
					const { view } = body;
					const { value: channel_id } = payload;

					const stateValues = view.state.values;

					const personaConfig = {
						...defaultPersonaConfig,
						prompt: stateValues.persona_prompt_block.persona_prompt.value,
						knowledge:
							stateValues.persona_knowledge_block.persona_knowledge.value,
						language: stateValues.persona_language_block.persona_language.value,
					};

					const fileContent = JSON.stringify(personaConfig, null, 2);

					const res = await client.files.uploadV2({
						channel_id: channel_id,
						content: fileContent,
						filename: `persona_config.json`,
						title: `SAVED - Persona Configuration`,
					});

					console.log('res', res);
				} catch (error) {
					console.error('File upload failed:', error);
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
};

export default registerAppHomeSubmitConfigEvent;
