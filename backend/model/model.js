// model/model.js
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

// // Define Tracker schema
// const TrackerSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     startdate: {
//         type: Date
//     },
//     enddate: {
//         type: Date
//     },
//     reason: {
//         type: String
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// });

// Create models
const User = mongoose.model('User', UserSchema);
// const Tracker = mongoose.model('Tracker', TrackerSchema);

// Export models
export default { User };
