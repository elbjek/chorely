import Chore from './Chore';

export default interface Category {
  id: number;
  name: string;
  user: any;
  chores: Chore[];
}
