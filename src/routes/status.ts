import router from 'express';

const routes = router.Router();

routes.get('/', (req, res) => {
	res.json({ message: 'API Up And Running' });
});

export default routes;
