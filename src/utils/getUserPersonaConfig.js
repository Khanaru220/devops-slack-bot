import { query } from 'express';
import { defaultPersonaConfig } from '../config/schema.js';
console.log(defaultPersonaConfig);

export const getUserPersonaConfig = async ({ client, channel_id }) => {
	try {
		const result = await client.files.list({
			channel: channel_id,
			types: 'json',
			count: 200,
		});

		const personaFiles = result.files.filter(
			(file) => file.name === 'persona_config.json'
		);

		if (personaFiles.length === 0) {
			console.log('Persona configuration file not found');
			return { ...defaultPersonaConfig };
		}

		// Pick the last file in the array
		const personaFile = personaFiles[personaFiles.length - 1];

		const fileInfo = await client.files.info({
			file: personaFile.id,
		});

		const personConfig = JSON.parse(fileInfo.content);
		console.log({ ...defaultPersonaConfig, ...personConfig });
		return { ...defaultPersonaConfig, ...personConfig };
	} catch (error) {
		console.error('Error retrieving persona config:', error);
		return { ...defaultPersonaConfig };
	}
};
