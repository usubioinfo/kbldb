import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@schemas/person.schema';

import { generatePassword } from '@utils/password.generator';

// Register person
export const addPersonRoute = async (req: Request, res: Response) => {
  req.body['changedPassword'] = false;
  const newPerson = new Person(req.body);
  const password = generatePassword();
  newPerson.password = password;

  const savedPerson = await personService.registerPerson(newPerson);
  if (savedPerson) {
    return res.json({success: true, msg: 'Successfully added person', payload: password});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};

export const addAdminRoute = async (req: Request, res: Response) => {
  req.body['changedPassword'] = false;
  const newPerson = new Person(req.body);
  newPerson.permission = 0;

  const savedPerson = await personService.registerPerson(newPerson);
  if (savedPerson) {
    return res.json({success: true, msg: 'Successfully added person'});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};
