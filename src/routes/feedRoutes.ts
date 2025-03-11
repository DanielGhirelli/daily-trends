// src/routes/feedRoutes.ts
import { Router } from 'express';
import { FeedController } from '../controllers/FeedController';
import { validateRequest } from '../middleware/validateRequest';
import { validateFeed, validateFeedId } from '../middleware/feedValidation';

const router = Router();

router.get('/', FeedController.getFeeds);
router.get('/:id', validateFeedId, validateRequest, FeedController.getFeed);
router.post('/', validateFeed, validateRequest, FeedController.createFeed);
router.put('/:id', validateFeedId, validateRequest, FeedController.updateFeed);
router.delete('/:id', validateFeedId, validateRequest, FeedController.deleteFeed);

// Endpoint to manually trigger scraping
router.post('/scrape', FeedController.scrapeFeeds);

export default router;
