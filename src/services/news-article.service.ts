import { INewsArticle } from '@models/news-article.model';
import { NewsArticle } from '@schemas/news-article.schema';
import { ModelService } from '@classes/model.service.class';

class NewsArticleService extends ModelService<INewsArticle> {
	private static instance: NewsArticleService;
	
	private constructor() {
		super(NewsArticle);
	}
	
	public static getInstance(): NewsArticleService {
		if (!NewsArticleService.instance) {
			NewsArticleService.instance = new NewsArticleService();
		}
		
		return NewsArticleService.instance;
	}
}

const newsArticleService = NewsArticleService.getInstance();
export default newsArticleService;
