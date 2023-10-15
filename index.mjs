import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import connectMongoDB from './config/mongodb.config.mjs';
import morgan from 'morgan';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import flash from 'express-flash';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// Import routes
import productRoutes from './routes/product.routes.mjs';

config({ debug: true });
connectMongoDB();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

app.set('port', process.env.PORT);
app.set('ip', process.env.IP);

app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

/*Setup View engine*/
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));
app.use(flash());

app.use(productRoutes);

app.listen(app.get('port'), app.get('ip'), () => {
    console.log(
        `Aggregation examples app is running on port ${app.get(
            'port',
        )} and ip ${app.get('ip')}...`,
    );
});
