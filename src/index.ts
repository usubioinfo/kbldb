// tslint:disable-next-line
require('tsconfig-paths/register');
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import https from 'https';

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

import { setupApp } from './middleware.setup';
import { dbConfig } from '@config/db.config';
import { port, apiBase, acceptedAgents } from '@config/constants';


let credentials: {key: string, cert: string} = {key: '', cert: ''};
/*
if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const privateKey  = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/cert.pem', 'utf8');

  credentials = {key: privateKey, cert: certificate};
}
*/

mongoose.connect(dbConfig.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + dbConfig.database);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

const app = setupApp();

// Passport


// Server
if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, () => {
    console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
    console.log('TLS/HTTPS enabled.');
    console.log('Port: ' + port);
  });
} else {
  app.listen(port, () => {
    console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
    console.log('TLS/HTTPS is off.');
    console.log('Port: ' + port);
  });
}
