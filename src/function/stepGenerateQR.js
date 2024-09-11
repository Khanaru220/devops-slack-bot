import { generateQRLink } from '../utils/generateQRLink.js';
import { usersData, findUserBySlackUID } from '../data/index.js';

const stepGenerateQR = (app) => {
	try {
		app.function(
			'sample_custom_step',
			async ({ inputs, complete, fail, logger }) => {
				try {
					const { accountOwnerSlackUID, amount, description, createdTime } =
						inputs;

					const { accountName, accountNumber, bankBinCode } =
						findUserBySlackUID(usersData, accountOwnerSlackUID);
					// total user
					// bill
					await complete({
						outputs: {
							priceMessage: amount ? `*Amount*: ${amount}đ/person\n` : '',
							message: generateQRLink({
								accountName,
								accountNumber,
								bankBinCode,
								amount,
								description,
								createdTime,
							}),
						},
					});
				} catch (error) {
					logger.error(error);
					console.error(error);
					await fail({
						error: `Failed to handle a function request: ${error}`,
					});
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
};

export default stepGenerateQR;
console