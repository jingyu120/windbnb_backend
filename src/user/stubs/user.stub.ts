import { User } from '../schemas/user.schema';

export const userStub = (): User => {
  return { name: 'Justin', email: 'jingyu120@gmail.com', password: '123123' };
};
