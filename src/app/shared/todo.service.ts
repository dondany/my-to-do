import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:8000/todos');
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>('http://localhost:8000/todos', todo);
  }

  updateTodo(id: string, completed: boolean) {
    return this.http.patch<Todo>(`http://localhost:8000/todos/${id}`, {
      completed,
    });
  }

  deleteTodo(id: string) {
    return this.http.delete(`http://localhost:8000/todos/${id}`);
  }
}
