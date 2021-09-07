import { Request, Response } from 'express';
import axios from 'axios';

type Node = {
  name: string,
  ip: string
}

const nodes: Node[] = [
  {name: 'chela01', ip: '10.1.1.1'},
  {name: 'chela02', ip: '10.1.1.2'},
  {name: 'chela03', ip: '10.1.1.3'},
  {name: 'chela04', ip: '10.1.1.4'},
  {name: 'chela05', ip: '10.1.1.5'},
  {name: 'chela-g01', ip: '10.1.1.11'},
];

const getNodeByName = (nodeName: string) => {
  const foundNode = nodes.filter(node => {
    return node.name === nodeName;
  });

  if (foundNode.length) {
    return foundNode[0];
  }

  return false;
}

export const getNodeStatusRoute = async (req: Request, res: Response) => {
  type Result = {
    status: 'online' | 'offline',
    node: string
  }

  let results: Result[] = [];

  for (let node of nodes) {
    try {
      const res = await axios.get(node.ip);
      results.push({
        node: node.name,
        status: 'online'
      });
      console.log(res);
    } catch (e) {
      console.log(e);
      results.push({
        node: node.name,
        status: 'offline'
      });
    }
  }

  return res.json({success: true, payload: results});
}
