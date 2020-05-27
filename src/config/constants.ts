import dotenv from 'dotenv';
dotenv.config();

let port = 3000;
let apiBase = '/v1/';

if (process.env.NODE_ENV === 'DEVTEST') {
  port = 3001;
}

if (process.env.NODE_ENV === 'DEVTEST' || process.env.NODE_ENV === 'PRODUCTION') {
  apiBase = '/v1/';
}

const acceptedAgents = ['KBLWebv1'];

export { port, apiBase, acceptedAgents };
