import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.post('/register', RouteFunctions.addPersonRoute);

const PersonRoutes = router;
export default PersonRoutes;
