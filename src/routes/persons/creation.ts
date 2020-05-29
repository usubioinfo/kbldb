import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@models/person.model';

import { generatePassword } from '@utils/password.generator';

// Register person
export const addPersonRoute = async (req: Request, res: Response) => {
  const newPerson = new Person(req.body);
  const password = generatePassword();
  newPerson.password = password;

  const savedPerson = await personService.registerPerson(newPerson);
  if (savedPerson) {
    return res.json({success: true, msg: 'Successfully added person', password: password});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};
