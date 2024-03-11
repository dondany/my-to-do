import { Component, EventEmitter, Output, input } from '@angular/core';
import { Checklist } from '../../../shared/model/checklist';

@Component({
  standalone: true,
  selector: 'app-checklist-list',
  template: `
    <div class="w-full flex flex-col gap-1">
      <h2 class="px-2 text-slate-400 text-sm font-medium">{{ title() }}</h2>
      @if (checklists().length === 0) {
      <span class="px-4 text-slate-400">No items...</span>
      }
      <ul class="grid grid-cols-2 gap-x-3">
        @for(checklist of checklists(); track checklist.id) {
        <li
          (click)="pickChecklist.emit(checklist.id)"
          class="my-2 p-3 rounded-md flex justify-start items-center gap-3 cursor-pointer border shadow-sm
          hover:bg-slate-50 text-slate-500
          dark:bg-slate-700 dark:border-white/10  hover:dark:bg-slate-600 dark:text-slate-300"
        >
          {{ checklist.name }}
        </li>
        }
      </ul>
    </div>
  `,
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();
  title = input.required<string>();
  @Output() pickChecklist: EventEmitter<string> = new EventEmitter();
}
