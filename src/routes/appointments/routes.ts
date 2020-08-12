import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './export';

router.post('/create', RouteFunctions.addNewAppointmentRoute);

const AppointmentRoutes = router;
export default AppointmentRoutes;
