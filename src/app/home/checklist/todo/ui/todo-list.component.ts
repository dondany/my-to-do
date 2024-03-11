import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { Todo } from '../../../../shared/model/todo';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <div class="w-full flex flex-col gap-1">
      <h2 class="px-2 text-slate-400 text-sm font-medium">{{ title() }}</h2>
      @if (todos().length === 0) {
      <span class="px-4 text-slate-400">No items...</span>
      }
      <ul>
        @for(todo of todos(); track todo.id) {
        <li
          (click)="toggleTodo.emit(todo)"
          class="my-2 p-3 rounded-md flex justify-start items-center gap-3 cursor-pointer border shadow-sm
          hover:bg-slate-50 text-slate-500
          dark:bg-slate-700 dark:border-white/10  hover:dark:bg-slate-600 dark:text-slate-300"
        >
          <div
            class="size-6 rounded-full flex justify-center items-center border
            dark:bg-slate-300"
            [ngClass]="{ 'bg-green-200 border-none': todo.completed }"
          >
            @if(todo.completed) {
            <span class="material-symbols-outlined text-green-600 text-lg"
              >done</span
            >
            }
          </div>
          <span
            class="text-lg"
            [ngClass]="{ 'line-through': todo.completed }"
            >{{ todo.text }}</span
          >
          <button
            (click)="deleteTodo.emit(todo.id); $event.stopPropagation()"
            class="ml-auto"
          >
            <span
              class="material-symbols-outlined text-red-300 hover:text-red-400"
            >
              delete
            </span>
          </button>
        </li>
        }
      </ul>
    </div>
  `,
  imports: [CommonModule],
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  title = input.required<string>();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<string> = new EventEmitter();
}
