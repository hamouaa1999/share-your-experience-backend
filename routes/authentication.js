import express from 'express';
import { signup, login } from '../controllers/authentication.js';
import User from '../models/User.js';

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

/* router.post("/logout", logout); */

authRouter.get('/delete-all-users', async (request, response) => { 
    await User.deleteMany({}); 
    return response.status(200).send("Done");
});

authRouter.get('/all-users', async (request, response) => { 
    try {
        const users = await User.find();
        return response.status(200).json({users});
    } catch (error) {
        response.status(400).json({error: error.message});
    }
});

export default authRouter;