import router from 'express';
import parseValidationResult from '../validators/errors.parser';
import authenticateJwt from '../controllers/middlewares';
import {
	createUserValidator,
	loginValidator,
	validateAccountActivate,
} from '../validators/user.validator';
import {
	createUserController,
	loginController,
	getTokenOwner,
	// activateAccount,
} from '../controllers/user';

const route = router.Router();

route.post(
	'/create',
	createUserValidator(),
	parseValidationResult,
	createUserController
);

route.post('/login', loginValidator(), parseValidationResult, loginController);

route.get('/account', authenticateJwt, getTokenOwner);

// route.post(
// 	'/activate-account',
// 	validateAccountActivate(),
// 	parseValidationResult,
// 	activateAccount
// );

export default route;
