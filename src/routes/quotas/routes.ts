import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/quotas/all', RouteFunctions.getQuotasRoute);

const QuotaRoutes = router;
export default QuotaRoutes;
