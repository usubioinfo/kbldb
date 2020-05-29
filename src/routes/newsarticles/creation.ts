import newsArticleService from '@services/newsarticle.service';
import { Request, Response } from 'express';
import { NewsArticle } from '@models/newsarticle.model';

export const addNewsArticleRoute = async (req: Request, res: Response) => {
  const newArticle = new NewsArticle(req.body);

  const savedArticle = await newsArticleService.saveModel(newArticle);
  if (savedArticle) {
    return res.json({success: true, msg: 'Successfully added news article', article: newArticle});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};
