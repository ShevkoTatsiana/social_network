import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {GalleryModel} from '../models/gallery.model';

const api = supertest(app);

describe.skip('gallery api', () => {
    const initialGallery = [
        {
            author_name: "admin4",
            createdAt: "2022-08-18T12:16:14.930Z",
            gallery_image: "https://firebasestorage.googleapis.com/v0/b/family-nw.appspot.com/o/vegan-recipes-683x1024.jpg_1660824973291?alt=media",
            group_id: "62737762648f0bd6e0902460",
            title: "new",
            updatedAt: "2022-08-18T12:16:14.930Z",
            _id: "62fe2d8e6dd61717b02883e4"
        }];

    beforeAll(async () => {
        await GalleryModel.insertMany(initialGallery);
    })

    test.only('GET all gallery images', async () => {
        const resp = await api
            .get(`/api/gallery/${initialGallery[0].group_id}`)
            .expect(200)
        const images = resp.body;
        expect(images).toHaveLength(1);
    });

    test('Could delete a gallery image', async () => {
        await api.delete(`/api/gallery/${initialGallery[0]._id}`)
        .expect(204)
    })

    afterAll(async () => {
        await GalleryModel.deleteMany();
        mongoose.connection.close()
    })
})