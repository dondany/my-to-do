import { Component, OnInit, inject } from '@angular/core';
import { TodoListComponent } from './ui/todo-list.component';
import { TodoStore } from '../shared/todo.store';
import { Todo } from '../shared/model/todo';
import { TodoFormComponent } from './ui/todo-form.component';
import { ThemeService } from '../shared/theme.service';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="w-full flex justify-center">
    <div class="w-96 flex flex-col gap-4 mt-6">
      <app-todo-form (addTodo)="todoStore.addTodo($event)" class="w-full" />
      <app-todo-list
        title="TO DO"
        [todos]="todoStore.activeTodos()"
        (toggleTodo)="todoStore.toggleTodo($event)"
        (deleteTodo)="todoStore.deleteTodo($event)"
        class="w-full"
      />
      <app-todo-list
        title="COMPLETED"
        [todos]="todoStore.completedTodos()"
        (toggleTodo)="todoStore.toggleTodo($event)"
        (deleteTodo)="todoStore.deleteTodo($event)"
        class="w-full"
      />
      <button
        (click)="themeService.toggle()"
        class="mt-auto mr-auto dark:text-white"
      >
        @if (themeService.dark()) {
        <span class="material-symbols-outlined"> light_mode </span>
        } @else {

        <span class="material-symbols-outlined"> dark_mode </span>
        }
      </button>
    </div>
  </div>`,
  imports: [TodoListComponent, TodoFormComponent],
})
export default class HomeComponent implements OnInit {
  todoStore = inject(TodoStore);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.todoStore.loadTodos();
  }
}
