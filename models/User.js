import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const userSchema = mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function(first, last, email, password) {

        const exists = await this.findOne({email});

        if (exists) {
            throw Error('Email already exists!');
        }
        
        if (!validator.isEmail(email)) {
            throw Error('Email not valid');
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Enter a strong password!');
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await this.create({ first, last, email, password: hash });

        return user;
}

userSchema.statics.login = async function(email, password) {

    try {
        const user = await this.findOne({email});
        if (!user) {
            throw Error('Email does not exist!');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect password');
        }
        return user;
    } catch (error) {
        throw Error(error.message);
    }

}

export default mongoose.model("User", userSchema);