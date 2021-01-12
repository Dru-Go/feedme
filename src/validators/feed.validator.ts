import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const createFeedValidator = () => [
	body('caption')
		.isString()
		.isLength({ min: 2, max: 100 })
		.withMessage('Image Caption is required'),
];

const validateFile = (req: Request, res: Response, next: NextFunction) => {
	const exceptedFileType = ['png', 'jpg', 'jpeg'];
	if (!req.file) {
		return res
			.status(httpStatus.FORBIDDEN)
			.json({ success: false, message: 'Image is required!' });
	}

	const fileExtension = req.file.mimetype.split('/').pop();
	if (fileExtension && !exceptedFileType.includes(fileExtension)) {
		return res
			.status(httpStatus.FORBIDDEN)
			.json({ success: false, message: 'Image file is not valid!' });
	}

	return next();
};

export { createFeedValidator, validateFile };
