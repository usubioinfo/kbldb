import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import personService from '@services/person.service';
import { dbConfig } from '@config/db.config';

export const authRoute = async (req: Request, res: Response) => {
  let user = await personService.findOneModelByParameter('username', req.body.username.toLowerCase());

  if (user) {
    const passwordMatched = await personService.comparePassword(req.body.password, user.password);
    if (!passwordMatched) {
      return res.json({success: false, msg: 'Wrong password!'});
    }

    user.password = '';
    // 1 day
    const time = 86400;
    const jwtToken = jwt.sign(user.toJSON(), dbConfig.secret, {expiresIn: time});
    return res.json({success: true, msg: 'Logged in!', user: user, jwt: jwtToken});
  }

  return res.json({success: false, msg: 'Could not find user...'});
};
