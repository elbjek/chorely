export default interface Chore {
  id: number;
  name: string;
  isCompleted: boolean;
  frequency: number;
  point: number;
  category: {
    id: number;
    name: string;
  };
}
