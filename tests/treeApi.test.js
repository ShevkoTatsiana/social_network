import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {TreeModel} from '../models/tree.model';

const api = supertest(app);
let treeMemberId;

describe.skip('tree api', () => {
    const testTree = [
        {
            children: [],
            dates: '12.01.1979',
            photo: '',
            info: '',
            level: 4,
            name: 'mother test',
            group_id: '62737762648f0bd6e0902460',
            parents: [],
            partner: '',
            siblings: []
        }];

    beforeAll(async () => {
        await TreeModel.deleteMany();
    })

    test('Create a tree', async () => {
        await api.post('/api/tree/create')
        .send({
            children: [],
            dates: '12.01.1999',
            photo: '',
            info: '',
            level: 5,
            name: 'me test',
            group_id: '62737762648f0bd6e0902460',
            parents: [],
            partner: '',
            siblings: []
        })
        .expect(201)
        const tree = await TreeModel.find();
        treeMemberId = tree[0]._id;
        expect(tree).toHaveLength(1);
    })

    test('GET tree', async () => {
        const resp = await api
            .get(`/api/tree/${testTree[0].group_id}`)
            .expect(200)
        const tree = resp.body;
        expect(tree).toHaveLength(1);
    });

    test('Could edit tree', async () => {
        await api
        .put(`/api/tree/${treeMemberId}`)
        .send({
            children: [],
            dates: '12.01.1999',
            photo: '',
            info: '',
            level: 5,
            name: 'me test new',
            group_id: '62737762648f0bd6e0902460',
            parents: [],
            partner: '',
            siblings: []
        })
        .expect(200)
        const tree = await TreeModel.find();
        expect(tree[0].name).toBe('me test new');
    })

    test('Could delete a tree', async () => {
        await api.delete(`/api/tree/${treeMemberId}`)
        .expect(204)
        const tree = await TreeModel.find();
        expect(tree).toHaveLength(0);
    })

    afterAll(async () => {
        await TreeModel.deleteMany();
        mongoose.connection.close()
    })
})