const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    doctorName: {
        type:String,
    },
    medicineName: {
        type: String,
    },
    disease: {
        type: String,
    }
})
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    pin: {
        type: Number,
        required: true
    },
    medicalRecord: {
        type: recordSchema,
        default: null,
    }

}, {timestamp: true}
)

const User = mongoose.model('user', userSchema);
module.exports = User;