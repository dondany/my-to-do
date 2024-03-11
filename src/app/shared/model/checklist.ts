import { Todo } from './todo';

export interface Checklist {
  id?: string;
  name: string;
}

export interface ChecklistDetails {
  id?: string;
  name: string;
  todos: Todo[];
}
