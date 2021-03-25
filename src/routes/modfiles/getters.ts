import { Request, Response } from 'express';
const {exec} = require('child-process-async');

type ExecOutput = {
  stdout: string,
  stderr: string
}

const MOD_FILES = process.env.MOD_FILES;

const EXCLUDE = ['test', 'template', 'bin'];

export const getModFilesInfoRoute = async (req: Request, res: Response) => {
  const output: ExecOutput = await exec(`ls ${MOD_FILES}`);

  let files = '';

  for (let folder of output.stdout.replace(/\s+/g, ' ').trim().split(' ')) {
    console.log(`ls ${MOD_FILES}/${folder}`);
    const fullPath = `${MOD_FILES}/${folder}`;

    files += folder;
    files += '\n';

    const dirCheck: ExecOutput = await exec(`file ${fullPath}`);

    // lmao
    if (EXCLUDE.includes(folder)) {
      continue;
    }

    if (dirCheck.stdout.split(':')[1].trim() !== 'directory') {
      console.log(`NOT DIR: ${fullPath}`);
      continue;
    }

    const lsOutput: ExecOutput = await exec(`ls ${MOD_FILES}/${folder}`);
    files += lsOutput.stdout;

    if (lsOutput.stderr) {
      console.log('ERROR');
    }

  }

  return res.send(files);
}

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

    if (dirCheck.stdout.split(':')[1].trim() !== 'directory') {
      console.log(`NOT DIR: ${fullPath}`);
      return {name: module, versions: [module]};
    }

    const versions = ((await exec(`ls ${fullPath}`)) as ExecOutput).stdout.replace(/\s+/g, ' ').trim().split(' ').map(version => {
      return `${module}/${version}`;
    });

    return {name: module, versions};
  }));


  return res.json({success: true, payload: modules});
}
