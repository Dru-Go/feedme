import router from 'express';
import { create, getAllFeeds, getMyFeeds } from '../controllers/feeds';
import parsedValidationResult from '../validators/errors.parser';
// import {
// 	createFeedValidator,
// 	validateFile,
// } from '../validators/feed.validator';

const routes = router.Router();

routes.post('/create', parsedValidationResult, create);
routes.get('/all', parsedValidationResult, getAllFeeds);
routes.get('/my', parsedValidationResult, getMyFeeds);

export default routes;
