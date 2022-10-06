import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {PostModel} from '../models/post.model';

const api = supertest(app);

describe.skip('post api', () => {
    const initialPost = [
        {
            author_name: "admin4",
            createdAt: "2022-08-18T12:16:14.930Z",
            group_id: "62737762648f0bd6e0902460",
            text: "Hello!",
            updatedAt: "2022-08-18T12:16:14.930Z",
            _id: "6329bb3547feb46c5f6b9393"
        }];

    beforeAll(async () => {
        await PostModel.insertMany(initialPost);
    })

    test('GET all posts', async () => {
        const resp = await api
            .get(`/api/posts/${initialPost[0].group_id}`)
            .expect(200)
        const posts = resp.body;
        expect(posts).toHaveLength(1);
    });

    afterAll(async () => {
        await PostModel.deleteMany();
        mongoose.connection.close()
    })
})