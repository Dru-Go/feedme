const modelNames = {
	user: 'Users',
	feed: 'Feeds',
};

const maxMinScore = {
	max: 10,
	min: 0,
};

const strongPasswordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

export { modelNames, strongPasswordRegex, maxMinScore };
