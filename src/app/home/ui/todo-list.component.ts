import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoService } from '../../shared/service/todo.service';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for(todo of todos(); track todo.id) {
      <li>
        <span>{{ todo.text }}</span>
        <input type="checkbox" [checked]="todo.completed" />
      </li>
      }
    </ul>
  `,
})
export class TodoListComponent {
  todoService = inject(TodoService);

  todos = toSignal(this.todoService.getTodos());
}
