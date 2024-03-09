import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { Todo } from '../../shared/model/todo';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <h2>{{ title() }}</h2>
    <ul>
      @for(todo of todos(); track todo.id) {
      <li>
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleTodo.emit(todo)"
        />
        <span>{{ todo.text }}</span>
        <button (click)="deleteTodo.emit(todo.id)">x</button>
      </li>
      }
    </ul>
  `,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  title = input.required<string>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<string> = new EventEmitter();
}
