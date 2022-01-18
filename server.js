import express from 'express';
import connectDb from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errormiddleware.js';
//auth0
import { auth } from 'express-openid-connect';
//import { requiresAuth } from 'express-openid-connect';

dotenv.config();
connectDb();
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env', //process.env.SECRET
  baseURL: 'http://localhost:5000',
  clientID: 'bSzcBmvhcK2wpFcIZNOjhmR2XRZqxKbl',
  issuerBaseURL: 'https://dev-19jj922m.us.auth0.com',
};

app.use(auth(config));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/api/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
