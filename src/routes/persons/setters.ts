import { Request, Response } from 'express';

import personService from '@services/person.service';

export const changePassRoute = async (req: Request, res: Response) => {

  let user = await personService.findOneModelByParameter('username', req.body.username.toLowerCase());

  if (user) {
    user.password = req.body.password;
    user.changedPassword = true;

    user.markModified('changedPassword');

    let changedPassword = await personService.changePassword(user);

    if (changedPassword) {
      return res.json({success: true, msg: 'Password changed!'});
    }

    return res.json({success: false, msg: 'Could not change password...'});
  }

  return res.json({success: false, msg: 'Could not find user...'});
};
