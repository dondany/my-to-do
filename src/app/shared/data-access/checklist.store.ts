import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ChecklistDetails } from '../model/checklist';
import { ChecklistService } from './checklist.service';
import { TodoService } from './todo.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../model/todo';

export interface ChecklistState {
  checklist: ChecklistDetails | null;
  loading: boolean;
}

export const ChecklistStore = signalStore(
  { providedIn: 'root' },
  withState<ChecklistState>({
    checklist: null,
    loading: false,
  }),
  withMethods(
    (
      store,
      checklistService = inject(ChecklistService),
      todoService = inject(TodoService)
    ) => ({
      loadChecklist: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) => checklistService.getChecklist(id)),
          tap((checklist) => patchState(store, { checklist, loading: false }))
        )
      ),
      addTodo: rxMethod<string>(
        pipe(
          switchMap((text) =>
            todoService.addTodo({
              text,
              completed: false,
              checklistId: store.checklist()!.id!,
            })
          ),
          tap((todo) => {
            const checklist = { ...store.checklist()! };
            checklist.todos = [...checklist.todos, todo];
            patchState(store, { checklist });
          })
        )
      ),
      toggleTodo: rxMethod<Todo>(
        pipe(
          switchMap((todo) =>
            todoService.updateTodo(todo.id!, !todo.completed)
          ),
          tap((todo) => {
            const checklist = { ...store.checklist()! };
            const updatedTodos = checklist.todos.map((t) => {
              if (t.id === todo.id) {
                return todo;
              }
              return t;
            });
            checklist.todos = updatedTodos;
            patchState(store, { checklist });
          })
        )
      ),
      deleteTodo: rxMethod<string>(
        pipe(
          switchMap((id) => {
            return todoService.deleteTodo(id).pipe(
              tap(() => {
                const checklist = { ...store.checklist()! };
                checklist.todos = checklist.todos.filter((t) => t.id !== id);
                patchState(store, { checklist });
              })
            );
          })
        )
      ),
    })
  ),
  withComputed(({ checklist }) => ({
    activeTodos: computed(() =>
      !!checklist() ? checklist()!.todos.filter((t) => !t.completed) : []
    ),
    completedTodos: computed(() =>
      !!checklist() ? checklist()!.todos.filter((t) => t.completed) : []
    ),
  }))
);
