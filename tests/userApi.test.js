import supertest  from 'supertest';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import mongoose from 'mongoose';
import { app } from '../server.js';
import { UserModel } from '../models/user.model';

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
const api = supertest(app);
let currentUser;
let token;
describe.skip('user api', () => {
    beforeAll(async () => {
        //await UserModel.deleteMany();
        await UserModel.insertMany(initialUser)
    })

    test('Create a new user', async () => {
        const resp = await api.post('/api/users/create')
        .send({
            name: 'JESTuser',
            email:"jestUser@test.com",
            password:"1234567890"
        })
        .expect(201)
        currentUser = resp.body;
        token = jwt.sign({ userId: currentUser._id }, config.jwtSecret);
        const users = await UserModel.find();
        expect(users[users.length-1].name).toBe('JESTuser')
    });

    test('User with invalid data can\'t be created', async () => {
        await api.post('/api/users/create')
        .send({
            name: 'JESTuser',
            email:"jestUser@test",
            password:""
        })
        .expect(400)
        const users = await UserModel.find();
        expect(users).toHaveLength(2)
    })

    test.only('GET All User call', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Could get a current user', async () => {
        await api.get(`/api/users/:${currentUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Couldn\'t update a current user with invalid data', async () => {
        await api.put(`/api/users/:${currentUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({           
            name: 'JESTuser',
            email:"jestUser1@test",
            password:"1234567890"            
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
        const users = await UserModel.find();
        expect(users[users.length-1].email).toBe("jestUser@test.com")
    })

    test('Could update a current user', async () => {
        await api.put(`/api/users/:${currentUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({           
            name: 'JESTuser',
            email:"jestUser1@test.com",
            password:"1234567890"            
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const users = await UserModel.find();
        expect(users[users.length-1].email).toBe("jestUser1@test.com")
    })

    test('Could get all users in a group', async () => {
        const userIds = [initialUser._id, currentUser._id];
        const resp = await api.get(`/api/users/group/${userIds}`)
        .expect(200)
        const usersIdArray = resp.body;
        expect(usersIdArray?.length).toBe(2)
    })

    test('Could delete a user', async () => {
        await api.delete(`/api/users/:${currentUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    })

    afterAll(async () => {
        await UserModel.deleteMany();
        mongoose.connection.close()
    })
})