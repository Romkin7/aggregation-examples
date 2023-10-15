import express from 'express';
import { config } from 'dotenv';
import connectMongoDB from './config/mongodb.config.mjs';
import morgan from 'morgan';

config();
connectMongoDB();

const app = express();

app.set('port', process.env.PORT);
app.set('ip', process.env.IP);

app.use(morgan('combined'));

app.listen(app.get('port'), app.get('ip'), () => {
    console.log(
        `Aggregation examples app is running on port ${app.get(
            'port',
        )} and ip ${app.get('ip')}...`,
    );
});
