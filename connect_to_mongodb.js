import mongoose from 'mongoose';
const MONGODB_CONNECTION_STRING = "<ADD-YOURS>"
async function connect_to_mongodb() {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
}

export default connect_to_mongodb;