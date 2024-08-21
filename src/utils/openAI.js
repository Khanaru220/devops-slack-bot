import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const composeBlockMessageForOpenAI = ({ text, role }) => {
	return { role: role, content: [{ text: text, type: 'text' }] };
};

export const generateOneAIResponse = async ({
	arrayMessages,
	modelConfig = {
		model: 'gpt-4o-mini',
		messages: arrayMessages,
		temperature: 0.9,
		max_tokens: 1089,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	},
}) => {
	const response = await openai.chat.completions.create({
		model: modelConfig.model,
		messages: arrayMessages,
		temperature: +modelConfig.temperature,
		max_tokens: +modelConfig.max_tokens,
		top_p: +modelConfig.top_p,
		frequency_penalty: +modelConfig.frequency_penalty,
		presence_penalty: +modelConfig.frequency_penalty,
	});
	return response.choices[0].message.content;
};
