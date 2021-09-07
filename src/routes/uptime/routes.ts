import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/uptimes', RouteFunctions.getAllUptimesRoute);
router.get('/nodes', RouteFunctions.getNodeStatusRoute);

const UptimeRoutes = router;
export default UptimeRoutes;
