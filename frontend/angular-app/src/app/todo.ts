export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  timestamp: Date;
  deadline?: Date;
  isOverdue?: boolean;
  timeRemaining?: string;
  priority?: number;
}