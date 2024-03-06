import request from 'supertest'
import { app } from './index'
import { MongoClient } from 'mongodb'
import { mongodbURL } from './config.js';
import mongoose from 'mongoose';



describe('GET /', () => {
    describe('given that the user accessed the / route', () => {
        it('should return a 200 status code', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200)
        })
    })
})

describe('testing database manipulations', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('users');
  });

  afterAll(async () => {
    await connection.close();
  });


  /* describe ('users api', () => {
    it ('should insert a new user into the users collection', async () => {
        const users = db.collection('users');
    
        const mockUser = {fullName: 'Hamou Ait Abderrahim', username: 'Mock', password: 'password', image: ''};
        await users.insertOne(mockUser);
    
        const insertedUser = await users.findOne({username: 'Mock'});
        expect(insertedUser).toEqual(mockUser);
      });
  }) */

  describe ('comments api', () => {


    it ('should add comment to the collection of comments', async () => {
        const comments = db.collection('comments');
        const mockComment = { author: new mongoose.Types.ObjectId(1), post: new mongoose.Types.ObjectId(2), content: 'My comment' }
        const newComment = await comments.insertOne(mockComment, {
            new: true
        });

        const returnedComment = await comments.findOne({_id: newComment.insertedId})

        expect(returnedComment).toEqual(mockComment)
    })

    it ('should respond with a 200 status code', async () => {
        const response = await request(app).post('/api/comments/add-comment', { author: new mongoose.Types.ObjectId(1),
            post: new mongoose.Types.ObjectId(2),
            content: 'My comment'
        });
        expect(response.statusCode).toBe(200)
    })
  })
});