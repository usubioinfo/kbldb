import { Request, Response } from 'express';
const { exec } = require('child-process-async');

const users = [
  'roussie',
  'rkaundal',
  'naveen',
  'rkataria',
  'smccowan',
  'dguevara',
  'khauck',
  'ajouffray'
]

export const getQuotasRoute = async (req: Request, res: Response) => {
  const { stdout, stderr } = await exec('beegfs-ctl --getquota --uid --all');

  const lines: string[] = stdout.split('\n').filter((line: string) => {
    for (let user of users) {
      if (line.includes(user)) {
        return true;
      }
    }

    return false;
  })
  .map((line: string) => {
    const trimmedline = line.trim().replace(/s+/g, ' ').replace(/[|]+/, '|');
    return trimmedline;
  });

  const parsedLines = lines.map((line: string) => {
    const parsedLine = line.split('|');

    return parsedLine.map((newLine: string) => {
      return newLine.trim();
    });
  });

  return res.status(500).json({success: false, msg: parsedLines});
};
