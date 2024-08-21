export const generateQRLink = ({
	accountNumber,
	accountName,
	bankBinCode,
	amount,
	description,
	createdTime,
}) => {
	if (!accountName) {
		return `AccountName not found`;
	}

	const formattedDate = !!createdTime
		? new Date(createdTime)
				.toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'short',
				})
				.toUpperCase()
		: '';

	let url = `https://api.vietqr.io/image/${bankBinCode}-${accountNumber}-BiUWikb.jpg?accountName=${encodeURI(
		accountName
	)}&amount=${amount}`;

	if (description) {
		const encodedDescription = encodeURIComponent(
			`${description} ${formattedDate}`
		);
		url += `&addInfo=${encodedDescription}`;
	}

	return url;
};
