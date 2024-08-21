import { generateQRLink } from '../utils/generateQRLink.js';
import { usersData, findUserBySlackUID } from '../data/index.js';

const registerCreateTicketShortcut = (app) => {
	try {
		app.shortcut(
			'airtable_create_ticket',
			async ({ ack, logger, client, payload, body, ...rest }) => {
				try {
					ack();
					// console.log('rest', rest);
					console.log('payload', payload);
					console.log('rest', rest);
					console.log(
						`payload's block message`,
						payload.message.blocks[0].elements[0].elements
					);
					const { user: usernameSendMessage, files } = payload.message;
					const { username: usernameTrigger } = payload.user;
					console.log('files', files);

					console.log('trigger shortcut airtable_create_ticket');

					const slackMessageLink = `https://${body.team.domain}.slack.com/archives/${body.channel.id}/p${body.message_ts}`;

					await client.views.open({
						view: {
							type: 'modal',
							title: {
								type: 'plain_text',
								text: 'Modal title',
							},
							blocks: [
								{
									type: 'input',
									label: {
										type: 'plain_text',
										text: 'Ticket Description',
									},
									optional: false,
									element: {
										type: 'rich_text_input',
										initial_value: payload.message.blocks[0],
										action_id: 'rich_text_input-action',
										placeholder: {
											type: 'plain_text',
											text: 'Describe about your ticket',
										},
									},
								},
								{
									type: 'input',
									label: {
										type: 'plain_text',
										text: 'Slack Message Link',
									},
									element: {
										type: 'url_text_input',
										action_id: 'input_slack-thread',
										placeholder: {
											type: 'plain_text',
											text: 'Type in here',
										},
										initial_value: slackMessageLink,
									},
									optional: false,
								},

								{
									type: 'input',
									label: {
										type: 'plain_text',
										text: 'Ticket Owner',
									},
									element: {
										action_id: 'users_select',
										type: 'users_select',
										placeholder: {
											type: 'plain_text',
											text: 'Select an item',
										},
										initial_user: usernameSendMessage,
									},
									optional: false,
								},
								{
									type: 'input',
									label: {
										type: 'plain_text',
										text: 'Ticket Type',
									},
									element: {
										type: 'radio_buttons',
										action_id: 'this_is_an_action_id',
										initial_option: {
											text: {
												type: 'plain_text',
												text: 'BUG',
											},
											value: 'A1',
										},
										options: [
											{
												value: 'A1',
												text: {
													type: 'plain_text',
													text: 'BUG',
												},
											},
											{
												value: 'A2',
												text: {
													type: 'plain_text',
													text: 'IMPROVEMENT',
												},
											},
											{
												value: 'A3',
												text: {
													type: 'plain_text',
													text: 'FEATURE',
												},
											},
										],
									},
									optional: false,
								},
							],
							close: {
								type: 'plain_text',
								text: 'Cancel',
							},
							submit: {
								type: 'plain_text',
								text: 'Save',
							},
							private_metadata: 'Shhhhhhhh',
							callback_id: 'view_identifier_12',
						},
						trigger_id: payload.trigger_id,
					});

					console.log('usernameSendMessage', usernameSendMessage);
				} catch (error) {
					logger.error(error);
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
};

export default registerCreateTicketShortcut;
