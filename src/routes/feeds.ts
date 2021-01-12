import router from 'express';
import { create, getAll } from '../controllers/feeds';

const routes = router.Router();

routes.post('/create', create);

routes.get('/getAll', getAll);

export default routes;
