import request from 'supertest';
import express from 'express';
import feedRoutes from '../src/routes/feedRoutes';
import { connectDB } from '../src/config/db';
import mongoose from 'mongoose';
import { IFeed } from '../src/models/Feed';

const app = express();
app.use(express.json());
app.use('/feeds', feedRoutes);

let createdFeed: IFeed | null = null;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Feed API Endpoints', () => {
  it('GET /feeds - should return feeds', async () => {
    const res = await request(app).get('/feeds');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /feeds - should create a new feed', async () => {
    const newFeed = {
      title: 'Test Feed Title',
      url: 'https://test.feed.com/daily-trends',
      source: 'Test',
    };

    const res = await request(app).post('/feeds').send(newFeed);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(newFeed.title);
    expect(res.body.url).toBe(newFeed.url);

    createdFeed = res.body; // Store created feed for update and delete tests
  });

  it('POST /feeds - should fail with missing fields', async () => {
    const res = await request(app).post('/feeds').send({
      title: 'Test Feed Title',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('URL is required');
  });

  it('POST /feeds - should fail with invalid URL', async () => {
    const res = await request(app).post('/feeds').send({
      title: 'Test Feed Title',
      url: 'invalid-url',
      source: 'Test',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('Invalid URL format');
  });

  it('PUT /feeds/:id - should update an existing feed', async () => {
    if (!createdFeed) throw new Error('No feed created to update.');

    const updatedData = {
      title: 'Updated Test Feed Title',
    };

    const res = await request(app).put(`/feeds/${createdFeed._id}`).send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedData.title);
  });

  it('PUT /feeds/:id - should fail with invalid id', async () => {
    const res = await request(app).put('/feeds/invalid-id').send({
      title: 'Test Update',
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('Invalid Feed ID format');
  });

  it('DELETE /feeds/:id - should delete a feed', async () => {
    if (!createdFeed) throw new Error('No feed created to delete.');

    const res = await request(app).delete(`/feeds/${createdFeed._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Feed deleted successfully');

    // Verify feed is removed
    const checkRes = await request(app).get(`/feeds/${createdFeed._id}`);
    expect(checkRes.status).toBe(404);
  });

  it('DELETE /feeds/:id - should fail with invalid id', async () => {
    const res = await request(app).delete('/feeds/invalid-id');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('Invalid Feed ID format');
  });
});
