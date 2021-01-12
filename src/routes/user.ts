import router from 'express';
import parseValidationResult from '../validators/errors.parser';
import {
	createUserValidator,
	loginValidator,
} from '../validators/user.validator';
import { createUserController, loginController } from '../controllers/user';

const route = router.Router();

route.post(
	'/create',
	createUserValidator(),
	parseValidationResult,
	createUserController
);

route.post('/login', loginValidator(), parseValidationResult, loginController);

export default route;
