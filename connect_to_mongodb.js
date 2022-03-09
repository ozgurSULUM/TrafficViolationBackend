import mongoose from 'mongoose';
const MONGODB_CONNECTION_STRING = "mongodb+srv://new-user-1231:auFirIJ9Nrvw3ErK@cluster0.uj9vf.mongodb.net/Violation?retryWrites=true&w=majority"
async function connect_to_mongodb() {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
}

export default connect_to_mongodb;