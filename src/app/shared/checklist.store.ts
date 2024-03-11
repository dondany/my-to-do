import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Checklist, ChecklistDetails } from './model/checklist';
import { ChecklistService } from './checklist.service';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from './model/todo';

export interface ChecklistState {
  checklists: Checklist[];
  currentChecklist: ChecklistDetails | null;
}

export const ChecklistStore = signalStore(
  { providedIn: 'root' },
  withState<ChecklistState>({
    checklists: [],
    currentChecklist: null,
  }),
  withMethods(
    (
      store,
      checklistService = inject(ChecklistService),
      todoService = inject(TodoService)
    ) => ({
      loadChecklists: rxMethod<void>(
        pipe(
          switchMap(() => checklistService.getChecklists()),
          tap((checklists) => patchState(store, { checklists }))
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
      pickCurrentChecklist: rxMethod<string>(
        pipe(
          switchMap((id) => checklistService.getChecklist(id)),
          tap((currentChecklist) => patchState(store, { currentChecklist }))
        )
      ),
      addTodo: rxMethod<string>(
        pipe(
          switchMap((text) =>
            todoService.addTodo({
              text,
              completed: false,
              checklistId: store.currentChecklist()!.id!,
            })
          ),
          tap((todo) => {
            const currentChecklist = { ...store.currentChecklist()! };
            currentChecklist.todos = [...currentChecklist.todos, todo];
            patchState(store, { currentChecklist });
          })
        )
      ),
      toggleTodo: rxMethod<Todo>(
        pipe(
          switchMap((todo) =>
            todoService.updateTodo(todo.id!, !todo.completed)
          ),
          tap((todo) => {
            const currentChecklist = { ...store.currentChecklist()! };
            const updatedTodos = currentChecklist.todos.map((t) => {
              if (t.id === todo.id) {
                return todo;
              }
              return t;
            });
            currentChecklist.todos = updatedTodos;
            patchState(store, { currentChecklist });
          })
        )
      ),
      deleteTodo: rxMethod<string>(
        pipe(
          switchMap((id) => {
            return todoService.deleteTodo(id).pipe(
              tap(() => {
                const currentChecklist = { ...store.currentChecklist()! };
                currentChecklist.todos = currentChecklist.todos.filter(
                  (t) => t.id !== id
                );
                patchState(store, { currentChecklist });
              })
            );
          })
        )
      ),
    })
  ),
  withComputed(({ currentChecklist }) => ({
    activeTodos: computed(() =>
      !!currentChecklist()
        ? currentChecklist()!.todos.filter((t) => !t.completed)
        : []
    ),
    completedTodos: computed(() =>
      !!currentChecklist()
        ? currentChecklist()!.todos.filter((t) => t.completed)
        : []
    ),
  }))
);
