import User from "../models/User.js";

export const getUser = async function(request, response) {
    try {
        const userId = request.params.id;
        const user = await User.findById(userId);
        return response.status(200).json({user});
    } catch (error) {
        response.status(400).json({error: error.message});
    }
}