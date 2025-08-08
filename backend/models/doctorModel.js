import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:"https://cdn.vectorstock.com/i/1000x1000/79/16/male-medical-doctor-icon-image-vector-14977916.webp"
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
       default: true
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    slots_booked: {
        type: Object,
        default: {}
    }
},{minimize: false});

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;