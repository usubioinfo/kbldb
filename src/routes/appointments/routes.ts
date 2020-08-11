import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './export';

router.post('/create', passport.authenticate('jwt', {session: false}), RouteFunctions.addNewAppointmentRoute);

const AppointmentRoutes = router;
export default AppointmentRoutes;
