const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
// const { test } = require('node:test');
const app = require('../app');
const server = app.listen(8080, () => console.log('Lets get ready to test.'));
const Item = require('../models/item');
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close() // programmatic ctrl+c
    mongoServer.stop() // getting rid of our MongoDB instance itself
    server.close()
})

describe('Test the todos endpoints', () => {
    test('It should create a new todo item', async () => {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'dishes', description: 'sink is full', completed: true, created_at: '2018-11-10T22:20:25.251Z' })
            // .send({ title: 'dishes', description: 'sink is full', completed: true })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('dishes')
        expect(response.body.description).toEqual('sink is full')
        expect(response.body.completed).toEqual(true)
        expect(response.body.created_at).toEqual('2018-11-10T22:20:25.251Z')
        // expect(response.body.created_at).toEqual(Date.now)
    })

    test('It should get one individual item', async () => {
        const item = new Item({ title: 'dishes', description: 'sink is full' })
        await item.save()
        
        const response = await request(app)
            .get(`/todos/${item._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('dishes')
        expect(response.body.description).toEqual('sink is full')
        expect(response.body.completed).toEqual(false)
    })
    
    test('It should list all todo list items', async () => {
        const itemOne = new Item({ title: 'dishes', description: 'sink is full' })
        await itemOne.save()
        const itemTwo = new Item({ title: 'vacuum', description: 'floor is dirty' })
        await itemTwo.save()

        const response = await request(app)
            .get('/todos')

        expect(response.statusCode).toBe(200)
        // expect(response.body.foundItems.itemOne).toHaveProperty('title')
        // expect(response.body.foundItems.itemOne.title).toEqual('dishes')
        expect.objectContaining(itemOne)
        expect.objectContaining(itemTwo)
    })

    test('It should update an item', async () => {
        const item = new Item({ title: 'dishes', description: 'sink is full', completed: false })
        await item.save()

        const response = await request(app)
            .put(`/todos/${item._id}`)
            .send({ title: 'dishes', description: 'sink is empty', completed: true })
    
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('dishes')
        expect(response.body.description).toEqual('sink is empty')
        expect(response.body.completed).toEqual(true)
    })

    test('It should delete an item', async () => {
        const item = new Item({ title: 'vacuum' })
        await item.save()

        const response = await request(app)
            .delete(`/todos/${item._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Item deleted')
        // expect(response.body).toEqual('/todos')
    })
})