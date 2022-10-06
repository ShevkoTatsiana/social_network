import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {UserGroupModel} from '../models/userGroup.model';

const api = supertest(app);

describe.skip('user group api', () => {
    const initialGroup = [
        {
            userId: "62727a3da0220ee6ba2e255a",
            groupId: "62737762648f0bd6e0902460"
        }, {
            userId: "626aa851cf61b7c46b6061aa",
            groupId: "62737762648f0bd6e0902460"
        }
    ];

    beforeAll(async () => {
        await UserGroupModel.insertMany(initialGroup);
    })

    test('GET user group info', async () => {
        console.log(initialGroup[0].groupId);
        const resp = await api
            .get(`/api/user_group/group/${initialGroup[0].groupId}`)
            .expect(200)
        const usersLength = resp.body.length;
        expect(usersLength).toBe(initialGroup.length);
    });

    afterAll(async () => {
        await UserGroupModel.deleteMany();
        mongoose.connection.close()
    })
})