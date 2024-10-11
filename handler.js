'use strict';
import server from './server.js';
import ServerlessHttp from 'serverless-http';

// Define and export hello function
export const hello = ServerlessHttp(server);