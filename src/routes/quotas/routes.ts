import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

import { authMethod } from '@middleware/auth';

router.get('/all', authMethod, RouteFunctions.getQuotasRoute);

const QuotaRoutes = router;
export default QuotaRoutes;
