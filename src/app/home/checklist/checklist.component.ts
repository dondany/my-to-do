import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistListStore } from '../../shared/data-access/checklist-list.store';
import { InputFormComponent } from '../../shared/ui/input-form.component';
import { ChecklistListComponent } from './ui/checklist-list.component';
import { SpinnerComponent } from '../../shared/ui/spinner.component';

@Component({
  standalone: true,
  selector: 'app-checklist',
  template: ` <div class="w-full flex flex-col gap-4">
    @if(checklistListStore.loading()) {
    <div class="mx-auto">
      <app-spinner />
    </div>
    } @else {
    <h1 class="ml-auto mr-auto text-slate-400 text-2xl">My To Do Checklists</h1>
    <app-input-form
      placeholder="Add checklist..."
      (addItem)="checklistListStore.addChecklist($event)"
    ></app-input-form>
    <app-checklist-list
      (pickChecklist)="onPickChecklist($event)"
      [checklists]="checklistListStore.checklists()"
      title="MY CHECKLISTS"
    ></app-checklist-list>
    }
  </div>`,
  imports: [ChecklistListComponent, InputFormComponent, SpinnerComponent],
})
export default class ChecklistComponent implements OnInit {
  checklistListStore = inject(ChecklistListStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.checklistListStore.loadChecklists();
  }

  onPickChecklist(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
