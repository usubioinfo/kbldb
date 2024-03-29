import { IPerson } from '@models/person.model';
import { Person } from '@schemas/person.schema';
import { ModelService } from '@classes/model.service.class';

import * as bcrypt from 'bcryptjs';

class PersonService extends ModelService<IPerson> {
  private static instance: PersonService;

  private constructor() {
    super(Person);
  }

  public static getInstance(): PersonService {
    if (!PersonService.instance) {
      PersonService.instance = new PersonService();
    }

    return PersonService.instance;
  }

  public async registerPerson(person: IPerson): Promise<IPerson | null> {
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;

    try {
      const savedModel = await person.save();
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async changePassword(person: IPerson): Promise<string | null> {
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;

    try {
      const savedModel = await this.saveChangedModel(person, 'password')
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async comparePassword(userPass: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPass, hashedPassword);
  }
}

const personService = PersonService.getInstance();
export default personService;
