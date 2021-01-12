/**
 * @extends Error
 */

class AppError extends Error {
	public message = '';

	public status = 300;

	public isPublic = false;

	public isOperational = false;

	constructor(message: string, status: number, isPublic: boolean) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
