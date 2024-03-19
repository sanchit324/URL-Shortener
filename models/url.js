const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
        unique: true
    }, 
    totalClicks: [
        {
            timestamps: {
                type: Number
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;

