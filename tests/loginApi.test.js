import supertest  from 'supertest';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import mongoose from 'mongoose';
import path from 'path';
import * as url from 'url';
import { app } from '../server.js';
import { UserModel } from '../models/user.model';
import { GroupModel } from '../models/group.model';
import {PostModel} from '../models/post.model';
import { RecipeModel } from '../models/recipe.model.js';
import { UserGroupModel } from '../models/userGroup.model.js';

const initialUser = 
    {
        "social":false,
        "status":"Pending",
        "_id":"626aa851cf61b7c46b6061aa",
        "name":"admin1",
        "email":"admin1@tut.com",
        "password_hash":"$2b$10$KL1nj.fei6O05jGUPJlt1..d9zoxPKqrPdTrjjrhj/s5x55bqxs6e",
        "profile_photo":"",
        "createdAt":"2022-04-28T14:44:33.678Z"
    };
let token;
let groupId;
const api = supertest(app);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

describe('Login api', () => {
    beforeAll(async () => {
        await UserModel.deleteMany();
        await GroupModel.deleteMany();
        await PostModel.deleteMany();
        await UserModel.insertMany(initialUser)
    })

    test('Login an user', async () => {
        const resp = await api.post('/api/auth/login')
        .send({
            email:"admin1@tut.com",
            password:"admin1"
        })
        .expect(200)
        token = resp.body?.token;
    });

    test('Create a group', async () => {
        const resp = await api.post('/api/group/create')
        .send({
            name: "JEST_Group",
            description: "JEST group description"
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        groupId = resp.body?._id;
        expect(groupId).toBeDefined();
    });

    test.skip('Update a group', async () => {
        await api.put(`/api/group/${groupId}`)
        .send({
            name: "JEST_Group1",
            description: "JEST group description"
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        const groups = await GroupModel.find();
        expect(groups[0].name).toBe("JEST_Group1")
    });

    test.skip('Create a user group', async () => {
        await api.post(`/api/user_group/${initialUser._id}/create`)
        .send({
            groupId, 
            userId: initialUser._id
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        const userGroup = await UserGroupModel.find();
        expect(userGroup).toHaveLength(1);
    });

    test.skip('Get all user group', async () => {
        const resp = await api.get(`/api/user_group/${initialUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        expect(resp.body).toHaveLength(1);
    });

    test.skip('Create a post', async () => {
        await api.post(`/api/posts/${initialUser._id}/create`)
        .send({
            author_name: initialUser.name,
            group_id: groupId,
            text: "JEST post description"
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        const posts = await PostModel.find();
        expect(posts).toHaveLength(1);
    });

    test.skip('Create a recipe', async () => {
        await api.post('/api/recepies/create')
        .send({
            title: "test recipe",
            recipe_photo: "",
            ingredients: "tomat, cucumber, olive oil",
            directions: "mix all",
            author_name: initialUser.name,
            group_id: groupId
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        const recipes = await RecipeModel.find();
        expect(recipes).toHaveLength(1);
    });

    test.skip('Delete a user group', async () => {
        await api.delete(`/api/user_group/${initialUser._id}/delete/${groupId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        const userGroups = await UserGroupModel.find();
        expect(userGroups).toHaveLength(0)
    })

    test.skip('Delete a group', async () => {
        await api.delete(`/api/group/${groupId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
        const groups = await GroupModel.find();
        expect(groups).toHaveLength(0)
    });

    test.skip('Create a new image', async () => {        
        await api.post('/api/gallery/create')  
        .field('title', 'JESTimage')
        .field('author_name', initialUser.name)
        .field('group_id', groupId)
        .attach('gallery_image', path.resolve(__dirname, './family-image.jpg'))
        .set('Authorization', `Bearer ${token}`)
        .expect(201)      
    });

    afterAll(async () => {
        await GroupModel.deleteMany();
        await UserModel.deleteMany();
        await PostModel.deleteMany();
        await RecipeModel.deleteMany();
        await UserGroupModel.deleteMany();
        mongoose.connection.close()
    })
})