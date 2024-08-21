class User {
	constructor(fullName, accountName, accountNumber, bankBinCode, slackUID) {
		this.fullName = fullName;
		this.accountName = accountName;
		this.accountNumber = accountNumber;
		this.bankBinCode = bankBinCode;
		this.slackUID = slackUID;
	}

	displayInfo() {
		return `${this.fullName} (${this.slackUID}) - Account Owner: ${this.accountName}, Account Number: ${this.accountNumber}`;
	}
}

export const usersData = [
	new User(
		'Tín Hoàng',
		'Hoang Quoc Tin',
		'9021788301460',
		'963388',
		'U05R49728DR'
	),
	new User(
		'Văn Huỳnh',
		'Huynh Cong Van',
		'0181003632913',
		'970436',
		'U05QPRNMV8F'
	),
	new User(
		'Mai Nguyễn',
		'Nguyen Thi Quynh Mai',
		'19036356495026',
		'970407',
		'U06KDHN2HDY'
	),
	new User(
		'Hoang Le (Mike)',
		'Le Mau Hoang',
		'19035632608011',
		'970407',
		'U06R272FAJU'
	),
	new User(
		'Quang Phạm',
		'Pham Minh Quang',
		'03992977701',
		'970423',
		'U06QMJQ61RV'
	),
	new User(
		'Duy Đàm (Ryan)',
		'Dam Vu Duy',
		'04301010769775',
		'970426',
		'U0700JJPJ92'
	),
	new User(
		'Hỷ Đặng (Bill)',
		'Dang Bach Hy',
		'99MM24177M38649999',
		'970454',
		'U079BHPGM8B'
	),
	new User('Hằng Hà', 'Ha Viet Hang', 'VIETHANG9', '970415', 'U0798PU6HD3'),
	new User('Kevin Davis', '', '', '', 'U05671WG4G7'),
	new User('Andrew McCrow', '', '', '', 'U056D3Q6U4E'),
	new User('Paul Watabe', '', '', '', 'U06BNTQ28QJ'),
	new User(
		'Hao Nguyen',
		'Nguyen Minh Hieu Hao',
		'0774390807',
		'970432',
		'U07ARBJBESH'
	),
	new User('Hùng Lê (Liam)', '', '', '', 'U0798PU2XHB'),
	new User('Thien Ly (Kai)', '', '', '', 'U07A0JYBUBZ'),
	new User('Ngọc Thái (Tequila)', '', '', '', 'U079BHPB23D'),
	new User('Tú Nguyễn (Amy)', '', '', '', 'U07AFA3G56W'),
	new User('Jessica Ashforth', '', '', '', 'U07CZR44G8P'),
	new User(
		'Nghi Lâm',
		'Lam Phuong Nghi',
		'0281000324106',
		'970436',
		'U07FD0P348H'
	),
	new User('Hippo', '', '', '', 'U077V684ZHB'),
];

export const findUserBySlackUID = (users, slackUID) => {
	const user = users.find((user) => user.slackUID === slackUID);
	return user ? user : 'User not found.';
};
