import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './export';

router.post('/create', passport.authenticate('jwt', {session: false}), RouteFunctions.addNewsArticleRoute);

const NewsArticleRoutes = router;
export default NewsArticleRoutes;
