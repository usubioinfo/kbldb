import { Request, Response } from 'express';
const {exec} = require('child-process-async');

type ExecOutput = {
  stdout: string,
  stderr: string
}

const MOD_FILES = process.env.MOD_FILES;

const EXCLUDE = ['test', 'template'];

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

  const modules = lsResults.stdout.replace(/\s+/g, ' ').trim().split(' ').filter(module => {
    if(EXCLUDE.includes(module)) {
      return false;
    }

    return true;
  });

  return res.json({success: true, payload: modules});
}
