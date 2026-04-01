import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import invoicesRouter from './routes/invoices.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger middleware
app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log('REQUEST:', req.method, req.url);
    next();
});

app.use('/api/invoices', invoicesRouter);

//Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => console.log('Server running on port 8000'));