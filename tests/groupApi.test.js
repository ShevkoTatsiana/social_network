import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {GroupModel} from '../models/group.model';

const api = supertest(app);

describe.skip('group api', () => {
    const initialGroup = [
        {
            createdAt: "2022-05-05T07:06:10.452Z",
            profile_photo: "https://firebasestorage.googleapis.com/v0/b/family-nw.appspot.com/o/IMG_12301-2-683x1024.jpg_1653466200955?alt=media",
            description: "family 300",
            name: "fam2",
            updatedAt: "2022-05-25T08:10:02.681Z",
            _id: "62737762648f0bd6e0902460"
        }];

    beforeAll(async () => {
        await GroupModel.insertMany(initialGroup);
    })

    test.only('GET group info', async () => {
        await api
            .get(`/api/group/family/${initialGroup[0].name}`)
            .expect(200)
    });

    test('GET all group', async () => {
        const groupIds = initialGroup.map(group => group._id);
        const resp = await api
            .get(`/api/group/${groupIds}`)
            .expect(200)  
        expect(resp.body).toHaveLength(1)
    })

    afterAll(async () => {
        await GroupModel.deleteMany();
        mongoose.connection.close()
    })
})