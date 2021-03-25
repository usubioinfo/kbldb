import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/modules', RouteFunctions.getAvailModulesRoute);

export default router;
