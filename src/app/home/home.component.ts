import { Component } from '@angular/core';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="">
    <app-todo-list />
  </div>`,
  imports: [TodoListComponent],
})
export default class HomeComponent {}
