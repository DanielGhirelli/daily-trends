// src/models/Feed.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IFeed extends Document {
  title: string;
  url: string;
  source: string;
  publishedAt: Date;
}

const FeedSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  source: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeed>('Feed', FeedSchema);
