import express from 'express';
import cookieParser from 'cookie-parser';
import 'babel-polyfill';
import cors from 'cors';
import env from './env.js';
import usersRoute from './app/routes/userRoutes.js';
import adminRoute from './app/routes/adminRoutes.js';
import seedRoute from './app/routes/seedUserRoutes.js';
import healthCheckRoute from './app/routes/healthCheckRoute.js';

const app = express();

app.use(cookieParser());
// parsing URL encoded bodies
app.use(cors());
// popopulating req body and parsing jason
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', usersRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', seedRoute);
app.use('/api/v1', healthCheckRoute);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});


export default app;