import { Component, OnInit, effect, inject } from '@angular/core';
import { ChecklistListComponent } from './ui/checklist-list.component';
import { ChecklistStore } from '../../shared/checklist.store';
import { InputFormComponent } from '../../shared/ui/input-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-checklist',
  template: ` <div class="w-full flex flex-col gap-4">
    <h1 class="ml-auto mr-auto text-slate-400 text-2xl">My To Do Checklists</h1>
    <app-input-form
      placeholder="Add checklist..."
      (addItem)="checklistStore.addChecklist($event)"
    ></app-input-form>
    <app-checklist-list
      (pickChecklist)="onPickChecklist($event)"
      [checklists]="checklistStore.checklists()"
      title="MY CHECKLISTS"
    ></app-checklist-list>
  </div>`,
  imports: [ChecklistListComponent, InputFormComponent],
})
export default class ChecklistComponent implements OnInit {
  checklistStore = inject(ChecklistStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.checklistStore.loadChecklists();
  }

  onPickChecklist(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
