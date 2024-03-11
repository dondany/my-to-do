import { Component, OnInit, inject, input } from '@angular/core';
import { ChecklistStore } from '../../../shared/checklist.store';
import { ThemeService } from '../../../shared/theme.service';
import { InputFormComponent } from '../../../shared/ui/input-form.component';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="w-full flex flex-col gap-4">
    <h1 class="ml-auto mr-auto text-slate-400 text-2xl">
      {{ checklistStore.currentChecklist()!.name }}
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
  </div>`,
  imports: [TodoListComponent, InputFormComponent],
})
export default class TodoComponent implements OnInit {
  id = input.required<string>();
  checklistStore = inject(ChecklistStore);
  themeService = inject(ThemeService);

  ngOnInit(): void {
    this.checklistStore.pickCurrentChecklist(this.id);
  }
}
