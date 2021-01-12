import router from 'express';
import testRoute from '../routes/status';
import userRoutes from '../routes/user';
import feedRoutes from '../routes/feeds';
import validateFirebaseIdToken from '../controllers/middlewares';

const route = router.Router();
route.use('/test', testRoute);
route.use('/user', userRoutes);
route.use('/feeds', validateFirebaseIdToken, feedRoutes);

export default route;
