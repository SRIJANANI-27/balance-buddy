import mongoose from 'mongoose';

// Define User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            startdate: {
                type: Date
            },
            enddate: {
                type: Date
            },
            reason: {
                type: String
            }
        }
    ]
});
const User = mongoose.model('User', UserSchema);

export default { User };