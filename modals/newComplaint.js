const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    anonymous: {
        type: Boolean,
        default: false
    }

}, {timestamp: true});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;