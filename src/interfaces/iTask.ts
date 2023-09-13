export interface iTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface iTaskWithoutId {
  title: string;
  description: string;
  isCompleted: boolean;
}
