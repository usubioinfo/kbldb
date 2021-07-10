import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/all', RouteFunctions.getQuotasRoute);

const QuotaRoutes = router;
export default QuotaRoutes;
