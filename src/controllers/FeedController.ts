// src/controllers/FeedController.ts
import { Request, Response } from 'express';
import { FeedService } from '../services/FeedService';

const feedService = new FeedService();

export class FeedController {
  public static async getFeeds(req: Request, res: Response): Promise<void> {
    try {
      const feeds = await feedService.getFeeds();
      res.status(200).json(feeds);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching feeds' });
    }
  }

  public static async getFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await feedService.getFeedById(req.params.id);
      if (feed) {
        res.status(200).json(feed);
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching feed' });
    }
  }

  public static async createFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await feedService.createFeed(req.body);
      res.status(201).json(feed);
    } catch (error) {
      res.status(500).json({ error: 'Error creating feed' });
    }
  }

  public static async updateFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await feedService.updateFeed(req.params.id, req.body);
      if (feed) {
        res.status(200).json(feed);
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating feed' });
    }
  }

  public static async deleteFeed(req: Request, res: Response): Promise<void> {
    try {
      const feed = await feedService.deleteFeed(req.params.id);
      if (feed) {
        res.status(200).json({ message: 'Feed deleted successfully' });
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting feed' });
    }
  }

  // Endpoint to trigger scraping manually
  public static async scrapeFeeds(req: Request, res: Response): Promise<void> {
    try {
      const feeds = await feedService.scrapeFeeds();
      res.status(200).json(feeds);
    } catch (error) {
      res.status(500).json({ error: 'Error scraping feeds' });
    }
  }
}
