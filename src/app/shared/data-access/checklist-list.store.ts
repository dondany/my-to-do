import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ChecklistService } from './checklist.service';
import { Checklist } from '../model/checklist';

export interface ChecklistListState {
  checklists: Checklist[];
  loading: boolean;
}

export const ChecklistListStore = signalStore(
  { providedIn: 'root' },
  withState<ChecklistListState>({
    checklists: [],
    loading: false,
  }),
  withMethods((store, checklistService = inject(ChecklistService)) => ({
    loadChecklists: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => checklistService.getChecklists()),
        tap((checklists) => patchState(store, { checklists, loading: false }))
      )
    ),
    addChecklist: rxMethod<string>(
      pipe(
        switchMap((name) => checklistService.addChecklist({ name })),
        tap((checklist) =>
          patchState(store, {
            checklists: [...store.checklists(), checklist],
          })
        )
      )
    ),
  }))
);
