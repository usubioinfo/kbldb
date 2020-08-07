// tslint:disable-next-line
require('tsconfig-paths/register');
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';

dotenv.config();
require('dotenv-defaults/config');

import { dbConfig } from '@config/db.config';
import { userPassportAuth } from '@config/passport';
import { port, apiBase, acceptedAgents } from '@config/constants';
import * as RoutesLib from '@config/route-defs';

mongoose.connect(dbConfig.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + dbConfig.database);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// CORS
const accessControl = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200'
  ];
  const origin = req.headers.origin;
  /*
  if (origin && typeof origin === 'string' && allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  */
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, KBL-User-Agent');
  res.header('Access-Control-Allow-Credentials', 'true');
  return next();
}

// Allows other domains to use this domain as an API
const originsWhitelist = [
  'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200'
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin && originsWhitelist.indexOf(origin) >= -1) {
      return callback(null, true);
    }

    const error = new Error('CORS Error');

    return callback(error, false);
  }
}

const cOpt: cors.CorsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
}

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(accessControl);

// Passport
userPassportAuth(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(apiBase + 'persons', RoutesLib.PersonRoutes);
app.use(apiBase + 'news', RoutesLib.NewsArticleRoutes);

app.get(apiBase, (req: Request, res: Response) => {
  res.status(404).send('404 Error');
});


// Server
app.listen(port, () => {
  console.log('\nKBL started in mode \'' + process.env.NODE_ENV + '\'');
  console.log('TLS/HTTPS is off.');
  console.log('Port: ' + port);
  console.log(`Reachable at ${apiBase}`);
});
