#!/usr/bin/env ts-node

import { execSync, spawn, spawnSync } from "child_process";


async function main() {
  const [_, cmd, action, ...args] = process.argv;

  if (action === 'run') {
    const nodemon = spawn('nodemon', [`${__dirname}/server.ts`, '--', process.cwd()]);
    nodemon.stdout.on('data', chunk => process.stdout.write(chunk));
    nodemon.stderr.on('data', chunk => process.stderr.write(chunk));
  }
}

main();