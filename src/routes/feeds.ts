import router from 'express';
import { create, getAllFeeds, getMyFeeds } from '../controllers/feeds';

const routes = router.Router();

routes.post('/create', create);
routes.get('/all', getAllFeeds);
routes.get('/my', getMyFeeds);

export default routes;
