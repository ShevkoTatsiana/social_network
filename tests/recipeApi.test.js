import supertest  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import {RecipeModel} from '../models/recipe.model';

const api = supertest(app);

describe.skip('recipe api', () => {
    const initialRecipe = [
        {
            author_name: "admin4",
            createdAt: "2022-08-19T14:59:05.886Z",
            directions: "cook",
            group_id: "62737762648f0bd6e0902460",
            ingredients: "vegatbles",
            recipe_photo: "https://firebasestorage.googleapis.com/v0/b/family-nw.appspot.com/o/files%2Fvegan-recipes-683x1024.jpg_1660921144625?alt=media&token=08d14cf9-f311-4e73-a484-77b02c40bd7e",
            title: "vegan",
            updatedAt: "2022-08-19T14:59:05.886Z",
            _id: "62ffa5399c91db72e5b43398"
        }];

    beforeAll(async () => {
        await RecipeModel.insertMany(initialRecipe);
    })

    test('GET all recipes', async () => {
        const resp = await api
            .get(`/api/recepies/${initialRecipe[0].group_id}`)
            .expect(200)
        const recipes = resp.body;
        expect(recipes).toHaveLength(1);
    });

    test('Could delete a recipe', async () => {
        await api.delete(`/api/recepies/${initialRecipe[0]._id}`)
        .expect(204)
        const recipes = await RecipeModel.find();
        expect(recipes).toHaveLength(0);
    })

    afterAll(async () => {
        await RecipeModel.deleteMany();
        mongoose.connection.close()
    })
})