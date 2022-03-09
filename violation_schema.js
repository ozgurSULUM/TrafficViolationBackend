import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ViolationSchema = new Schema({
    violation_video_url: String,
});

export default ViolationSchema;