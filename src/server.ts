import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {envOrDefault} from '@ncode/core';
import cors from 'cors';

type RoutesMap = Record<string, any>;

function registerRoutes(routes: RoutesMap, app: any, path= "") {
  for (const name in routes) {
    if (['POST', 'GET', 'PUT', 'PATCH', 'DELETE'].includes(name)) {
      app[name.toLowerCase()](path, routes[name]);
      console.log(name.padStart(6, ' '), path);
    } else  {
      registerRoutes(routes[name], app, path + name);
    }
  }
}


async function main() {
  const projectDir = process.cwd();
  const routes = (await import(`${projectDir}/src/routes.ts`))?.default || {};
  
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(cors());

  console.log('\nRegistering routes:');
  registerRoutes(routes, app);

  const port = envOrDefault('PORT', 4000);

  app.listen(port, () => {
    console.log(`\nAPI running on port ${port}`);
  });
} 

main();