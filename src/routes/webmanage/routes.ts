import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

import { authMethod } from '@middleware/auth';

router.post('/update', authMethod, RouteFunctions.updateSiteRoute);

const ManageRoutes = router;
export default ManageRoutes;
