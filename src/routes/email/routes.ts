import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.post('/send', RouteFunctions.sendNewEmailRoute);
router.post('/pscsend', RouteFunctions.sendPscEmailRoute);

const EmailRoutes = router;
export default EmailRoutes;
