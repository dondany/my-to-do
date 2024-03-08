import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { Todo } from '../../shared/model/todo';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for(todo of todos(); track todo.id) {
      <li>
        <span>{{ todo.text }}</span>
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleTodo.emit(todo)"
        />
      </li>
      }
    </ul>
  `,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter();
}
