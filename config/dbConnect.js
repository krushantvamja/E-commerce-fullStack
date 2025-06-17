import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery",false);
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to db ${connected.connection.host}`);
       
    } catch (error) {
        console.log(`error at ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;

// Jwz6lUYq9eonLMBL : password for mongo db cluster
// username for cluster : krushantvamja9875