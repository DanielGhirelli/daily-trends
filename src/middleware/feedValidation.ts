import { body, param } from 'express-validator';

export const validateFeed = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),

  body('url')
    .trim()
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Invalid URL format'),

  body('source')
    .trim()
    .notEmpty()
    .withMessage('Source is required'),
];

export const validateFeedId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Feed ID format'),
];
