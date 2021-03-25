import { Request, Response } from 'express';
const {exec} = require('child-process-async');

import { LinkMap } from './config';

type ExecOutput = {
  stdout: string,
  stderr: string
}

const MOD_FILES = process.env.MOD_FILES;

const EXCLUDE = ['test', 'template', 'bin'];

export const getAvailModulesRoute = async (req: Request, res: Response) => {
  const lsResults: ExecOutput = await exec(`ls ${MOD_FILES}`);

  // tbh this is kinda insane, this is definitely something to clean up in the future
  let modules = await Promise.all(lsResults.stdout.replace(/\s+/g, ' ').trim().split(' ').filter(module => {
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

    return {module, versions, name: metadata.name, link: metadata.link};
  }));


  return res.json({success: true, payload: modules});
}
