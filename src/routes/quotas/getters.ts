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
];

const usageDict: Record<string, number> = {
  'KiB': 1000000000,
  'MiB': 1000000,
  'GiB': 1000,
  'TiB': 1
}

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
    const trimmedline = line.trim().replace(/\s+/g, ' ').replace(/[|]+/g, '|');
    return trimmedline;
  });

  const parsedLines = lines.map((line: string) => {
    const parsedLine = line.split('|');

    return parsedLine.map((newLine: string) => {
      return newLine.trim();
    });
  });


  const dataUsage = parsedLines.map((line) => {
    const name = line[0];
    const usage = {
      size: parseFloat(line[2].split(' ')[0]),
      units: line[2].split(' ')[1]
    }

    const limit = {
      size: parseFloat(line[3].split(' ')[0]),
      units: line[3].split(' ')[1]
    }

    const divFactor = usageDict[usage.units];

    const totalUsage: number = ((usage.size / divFactor) / limit.size) * 100;

    return {
      name,
      useage: Math.round(100 * totalUsage)/100
    }
  });

  return res.status(200).json({success: true, payload: dataUsage});
};
