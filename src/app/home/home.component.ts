import { Component, OnInit, inject } from '@angular/core';
import { TodoListComponent } from './ui/todo-list.component';
import { TodoStore } from '../shared/todo.store';
import { Todo } from '../shared/model/todo';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="">
    <app-todo-list
      [todos]="todoStore.todos()"
      (toggleTodo)="todoStore.toggleTodo($event)"
    />
    <button (click)="todoStore.addTodo('lol')">Add</button>
  </div>`,
  imports: [TodoListComponent],
})
export default class HomeComponent implements OnInit {
  todoStore = inject(TodoStore);

  ngOnInit(): void {
    this.todoStore.loadTodos();
  }
}
