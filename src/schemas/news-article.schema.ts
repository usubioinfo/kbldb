import mongoose, { Schema, Model } from 'mongoose';
import { INewsArticle } from '@models/news-article.model';

const NewsArticleSchema: Schema = new Schema({
	author: {type: String, required: true},
	authorID: {type: String, required: true},
	timePublished: {type: String, required: true},
	heading: {type: String, required: true},
	description: {type: String, required: false},
	articleText: {type: String, required: true},
	thumbnailURL: {type: String, required: false},
	articleImgURL: {type: String, required: false}
},{
	minimize: false
});

export const NewsArticle: Model<INewsArticle> = mongoose.model<INewsArticle>('NewsArticle', NewsArticleSchema);
