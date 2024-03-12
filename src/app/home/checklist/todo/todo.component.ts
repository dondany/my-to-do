import { Component, OnInit, inject, input } from '@angular/core';
import { ChecklistStore } from '../../../shared/data-access/checklist.store';
import { ThemeService } from '../../../shared/theme.service';
import { InputFormComponent } from '../../../shared/ui/input-form.component';
import { TodoListComponent } from './ui/todo-list.component';
import { SpinnerComponent } from '../../../shared/ui/spinner.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="w-full flex flex-col gap-4">
    @if (checklistStore.loading()) {
    <div class="mx-auto">
      <app-spinner />
    </div>
    } @else {
    <h1 class="mx-auto text-slate-400 text-2xl">
      {{ checklistStore.checklist()?.name }}
    </h1>
    <app-input-form (addItem)="checklistStore.addTodo($event)" class="w-full" />
    <app-todo-list
      title="TO DO"
      [todos]="checklistStore.activeTodos()"
      (toggleTodo)="checklistStore.toggleTodo($event)"
      (deleteTodo)="checklistStore.deleteTodo($event)"
      class="w-full"
    />
    <app-todo-list
      title="COMPLETED"
      [todos]="checklistStore.completedTodos()"
      (toggleTodo)="checklistStore.toggleTodo($event)"
      (deleteTodo)="checklistStore.deleteTodo($event)"
      class="w-full"
    />
    }
  </div>`,
  imports: [TodoListComponent, InputFormComponent, SpinnerComponent],
})
export default class TodoComponent implements OnInit {
  id = input.required<string>();
  checklistStore = inject(ChecklistStore);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.checklistStore.loadChecklist(this.id);
  }
}
