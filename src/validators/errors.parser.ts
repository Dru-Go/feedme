import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

const parceError = (req: Request, res: Response, next: NextFunction) => {
	const validationErrors = validationResult(req);

	if (validationErrors.isEmpty()) {
		return next();
	}

	return res.status(httpStatus.BAD_REQUEST).json(validationErrors);
};

export default parceError;
