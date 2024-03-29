import winston from 'winston';

const fileOptions = {
	maxSize: 2e6,
};

const logger = {
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
			...fileOptions,
		}),
		new winston.transports.File({
			filename: 'logs/combined.log',
			...fileOptions,
		}),
	],
};

export default logger;
