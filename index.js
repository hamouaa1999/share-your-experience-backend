import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongodbURL } from './config.js';
import authRouter from './routes/authentication.js';
import cors from 'cors';
import postRouter from './routes/post.js';
import userRouter from './routes/users.js';
import commentRouter from './routes/comment.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

export const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type']
    }
  });

app.use(express.json({limit: '50mb'}))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
    
}));

app.use('/api/auth', authRouter);

app.use('/api/users', userRouter);

app.use('/api/post', postRouter);

app.use('/api/comments', commentRouter);

app.get('/', (request, response) => {
    return response.status(200).send("Hamou ait abderrahim, the wealthiest man in the world");
});


/* mongoose.connect(mongodbURL)
.then(() => {
    console.log("Connected successfully to the database");
    io.on('connection', (socket) => {
        console.log('A new client is connected: ' + Object.keys(socket));
        socket.on('disconnect', () => console.log('Client disconnected'));
        socket.on('new like', (like) => {
            io.emit('new like', like);
        })
        socket.on('new comment', (comment) => {
            console.log(comment.author)
            io.emit('new comment', comment);
        });
        socket.on('new post', (post) => io.emit('new post', post));
    })
    server.listen(PORT, () => console.log('Listening on port: ' + PORT));
}).catch((error) => {
    console.log("Error: " + error.message);
}) */