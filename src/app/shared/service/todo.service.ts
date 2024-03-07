import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:8000/todos');
  }
}
