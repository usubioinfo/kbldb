import mongoose, { Document } from 'mongoose';

export interface INewsArticle extends Document {
  author: string;
  authorID: string;
  timePublished: string;
  heading: string;
  description?: string;
  articleText: string;
  thumbnailURL?: string;
  articleImgURL?: string;
}
