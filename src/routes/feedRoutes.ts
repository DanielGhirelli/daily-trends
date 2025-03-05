// src/routes/feedRoutes.ts
import { Router } from 'express';
import { FeedController } from '../controllers/FeedController';

const router = Router();

router.get('/', FeedController.getFeeds);
router.get('/:id', FeedController.getFeed);
router.post('/', FeedController.createFeed);
router.put('/:id', FeedController.updateFeed);
router.delete('/:id', FeedController.deleteFeed);

// Endpoint to manually trigger scraping
router.post('/scrape', FeedController.scrapeFeeds);

export default router;
