import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './export';

router.post('/register', RouteFunctions.addPersonRoute);
router.post('/admin/register', RouteFunctions.addAdminRoute);

router.post('/auth', RouteFunctions.authRoute);
router.post('/confpass', passport.authenticate('jwt', {session: false}), RouteFunctions.changePassRoute);

const PersonRoutes = router;
export default PersonRoutes;
