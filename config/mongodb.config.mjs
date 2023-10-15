import { connect } from 'mongoose';

const DATABASE_URL = process.env.DATABASE;

/**
 * connectMongoDB function
 * @returns {Promise<typeof import("mongoose")>}
 */
async function connectMongoDB() {
    return await connect(DATABASE_URL);
}

export default connectMongoDB;
