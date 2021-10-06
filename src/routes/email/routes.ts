import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';
import { authMethod } from '@middleware/auth';

router.post('/send', RouteFunctions.sendNewEmailRoute);

const EmailRoutes = router;
export default EmailRoutes;
