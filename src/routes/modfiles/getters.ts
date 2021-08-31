import { Request, Response } from 'express';
const {exec} = require('child-process-async');
import cron from 'node-cron';
import axios from 'axios';

import { LinkMap } from './config';

type ExecOutput = {
  stdout: string,
  stderr: string
}

const MOD_FILES = process.env.MOD_FILES;

const EXCLUDE = ['test', 'template', 'bin'];

let modules: {module: string, versions: string[], name: string, link: string}[] = [];

cron.schedule('0 4 * * *', async () => {
  modules = [];

  await axios.get('http://bioinfocore.usu.edu/api/modfiles/modules');
});

export const getAvailModulesRoute = async (req: Request, res: Response) => {
  const lsResults: ExecOutput = await exec(`ls ${MOD_FILES}`);

  if (modules.length > 0) {
    return res.json({success: true, payload: modules});
  }

  // tbh this is kinda insane, this is definitely something to clean up in the future
  modules = await Promise.all(lsResults.stdout.replace(/\s+/g, ' ').trim().split(' ').filter(module => {
    if(EXCLUDE.includes(module)) {
      return false;
    }

    return true;
  })
  .map( async (module) => {
    const fullPath = `${MOD_FILES}/${module}`;
    const dirCheck: ExecOutput = await exec(`file ${fullPath}`);

    let metadata = LinkMap[module];

    if (!metadata) {
      metadata = {name: module, link: '#'};
    }

    if (dirCheck.stdout.split(':')[1].trim() !== 'directory') {
      console.log(`NOT DIR: ${fullPath}`);
      return {module, versions: [module], name: metadata.name, link: metadata.link};
    }

    const versions = ((await exec(`ls ${fullPath}`)) as ExecOutput).stdout.replace(/\s+/g, ' ').trim().split(' ').map(version => {
      return `${module}/${version}`;
    });

    const data = {module, versions, name: metadata.name, link: metadata.link};

    return data;
  }));


  return res.json({success: true, payload: modules});
}
