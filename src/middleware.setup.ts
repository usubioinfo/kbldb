import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { Request, Response, NextFunction } from 'express';

export function setupApp() {
  const acceptedAgents = ['KBLWebv1'];

  const app = express();

  // Access Control
  const accessControl = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [
      'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200',
      'astria.inquantir.com'
    ];
    const origin = req.headers.origin;
    if (origin && typeof origin === 'string' && allowedOrigins.indexOf(origin) > -1) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return next();
  }

  // Allows other domains to use this domain as an API
  const originsWhitelist = [
    'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200',
    'astria.inquantir.com'
  ];
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (origin) {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
      }
    },
    credentials: true
  }

  const middleware: any[] = [bodyParser.urlencoded({extended: true}), bodyParser.json(), cookieParser(), helmet(), accessControl, cors(corsOptions)]

  middleware.forEach((func: any) => {
    app.use(func);
  });

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  return app;
}
