import express from 'express';
const router = express.Router();
import * as RouteFunctions from './export';

router.post('/create', RouteFunctions.addNewsArticleRoute);

const NewsArticleRoutes = router;
export default NewsArticleRoutes;
