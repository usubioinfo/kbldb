import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.get('/info', RouteFunctions.getModFilesInfoRoute);
router.get('/modules', RouteFunctions.getAvailModulesRoute);

export default router;
