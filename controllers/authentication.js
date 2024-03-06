import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'});
    return token
}

export const signup = async (request, response) => {
    console.log('Sign Up');
    try {

        const { first, last, email, password } = request.body;
        const user = await User.signup(first, last, email, password);
        return response.status(200).json({user});
    } catch (error) {
        console.log(error.message)
        return response.status(400).send("Error signing up: " + error.message);
    }
}

export const login = async (request, response) => {

    try {

        console.log('Login');
        const { email, password } = request.body;

        const user = await User.login(email, password);

        const token = createToken(user._id);

        return response.status(200).json({user, token});
    } catch (error) {
        return response.status(500).send('Error while logging in: ' + error.message);
    }

}