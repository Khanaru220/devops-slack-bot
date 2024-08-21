const getLogoBlock = (logoUrl) => ({
	type: 'image',
	image_url: logoUrl,
	alt_text: 'App Logo',
});

const getWelcomeSectionBlock = (welcomeMessage) => ({
	type: 'section',
	text: {
		type: 'mrkdwn',
		text: welcomeMessage,
	},
});

const getDividerBlock = () => ({
	type: 'divider',
});

const getInputBlock = (
	blockId,
	actionId,
	label,
	multiline = false,
	initialValue = ''
) => ({
	type: 'input',
	block_id: blockId,
	element: {
		type: 'plain_text_input',
		action_id: actionId,
		multiline: multiline,
		...(initialValue && { initial_value: initialValue }),
	},
	label: {
		type: 'plain_text',
		text: label,
	},
});

const getNumberInputBlock = (blockId, actionId, label, initialValue = '') => ({
	type: 'input',
	block_id: blockId,
	element: {
		type: 'plain_text_input',
		action_id: actionId,
		initial_value: initialValue,
		placeholder: {
			type: 'plain_text',
			text: 'Enter a number',
		},
	},
	label: {
		type: 'plain_text',
		text: label,
	},
});

const getActionsBlock = (buttons) => ({
	type: 'actions',
	elements: buttons,
});

const getButtonElement = ({
	text,
	actionId,
	style = '',
	url = '',
	value = '',
}) => {
	const button = {
		type: 'button',
		text: {
			type: 'plain_text',
			text: text,
		},
		action_id: actionId,
	};

	if (style) {
		button.style = style;
	}

	if (url) {
		button.url = url;
	}
	if (value) {
		button.value = value;
	}

	return button;
};

export {
	getLogoBlock,
	getWelcomeSectionBlock,
	getDividerBlock,
	getInputBlock,
	getActionsBlock,
	getButtonElement,
	getNumberInputBlock,
};
