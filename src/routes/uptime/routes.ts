import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/uptimes', RouteFunctions.getAllUptimesRoute);

const UptimeRoutes = router;
export default UptimeRoutes;
