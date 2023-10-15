import { connect } from 'mongoose';

/**
 * connectMongoDB function
 * @returns {Promise<typeof import("mongoose")>}
 */
async function connectMongoDB() {
    const DATABASE_URL = process.env.DATABASE;
    console.log(`Connecting to ${DATABASE_URL} MongoDB`);
    return await connect(DATABASE_URL);
}

export default connectMongoDB;
