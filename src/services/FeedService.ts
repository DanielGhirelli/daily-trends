// src/services/FeedService.ts
import Feed, { IFeed } from '../models/Feed';
import { ElPaisScraper } from './scrapers/ElPaisScraper';
import { ElMundoScraper } from './scrapers/ElMundoScraper';

export class FeedService {
  // Create a new feed manually
  public async createFeed(feedData: Partial<IFeed>): Promise<IFeed> {
    return Feed.findOneAndUpdate(
      { url: feedData.url }, 
      { $set: feedData }, 
      { upsert: true, new: true }
    );
  }  

  // Get all feeds
  public async getFeeds(): Promise<IFeed[]> {
    return Feed.find().sort({ publishedAt: -1 });
  }

  // Get feed by ID
  public async getFeedById(id: string): Promise<IFeed | null> {
    return Feed.findById(id);
  }

  // Update feed
  public async updateFeed(id: string, feedData: Partial<IFeed>): Promise<IFeed | null> {
    return Feed.findByIdAndUpdate(id, feedData, { new: true });
  }

  // Delete feed
  public async deleteFeed(id: string): Promise<IFeed | null> {
    return Feed.findByIdAndDelete(id);
  }

  // Scrape feeds from both sources and save them to the database
  public async scrapeFeeds(): Promise<IFeed[]> {
    const elPaisScraper = new ElPaisScraper();
    const elMundoScraper = new ElMundoScraper();

    // Use Promise.all to run both scrapers concurrently.
    const [elPaisFeeds, elMundoFeeds] = await Promise.all([
      elPaisScraper.scrape(),
      elMundoScraper.scrape(),
    ]);

    const allFeeds = [...elPaisFeeds, ...elMundoFeeds];

    // Save feeds to database
    const savedFeeds = await Promise.all(
      allFeeds.map(async (feedData) => {
        return Feed.findOneAndUpdate(
          { url: feedData.url },
          {
            $set: {
              title: feedData.title,
              source: feedData.source,
            },
          },
          { upsert: true, new: true }
        );
      })
    );

    return savedFeeds;
  }
}
