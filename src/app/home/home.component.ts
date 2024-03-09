import { Component, OnInit, inject } from '@angular/core';
import { TodoListComponent } from './ui/todo-list.component';
import { TodoStore } from '../shared/todo.store';
import { Todo } from '../shared/model/todo';
import { TodoFormComponent } from './ui/todo-form.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="">
    <app-todo-form (addTodo)="todoStore.addTodo($event)" />
    <app-todo-list
      title="To do"
      [todos]="todoStore.activeTodos()"
      (toggleTodo)="todoStore.toggleTodo($event)"
      (deleteTodo)="todoStore.deleteTodo($event)"
    />
    <app-todo-list
      title="Completed"
      [todos]="todoStore.completedTodos()"
      (toggleTodo)="todoStore.toggleTodo($event)"
      (deleteTodo)="todoStore.deleteTodo($event)"
    />
  </div>`,
  imports: [TodoListComponent, TodoFormComponent],
})
export default class HomeComponent implements OnInit {
  todoStore = inject(TodoStore);

  ngOnInit(): void {
    this.todoStore.loadTodos();
  }
}
