import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './export';

router.post('/send', RouteFunctions.sendNewEmailRoute);

const EmailRoutes = router;
export default EmailRoutes;
