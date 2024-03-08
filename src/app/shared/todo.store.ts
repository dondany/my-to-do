import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from './model/todo';
import { TodoService } from './todo.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface TodoState {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
}

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<TodoState>({
    todos: [],
    error: null,
    isLoading: false,
  }),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadTodos: rxMethod<void>(
      pipe(
        switchMap(() => todoService.getTodos()),
        tap((todos) => patchState(store, { todos }))
      )
    ),
    addTodo: rxMethod<string>(
      pipe(
        switchMap((text) => todoService.addTodo({ text, completed: false })),
        tap((todo) => patchState(store, { todos: [...store.todos(), todo] }))
      )
    ),
    toggleTodo: rxMethod<Todo>(
      pipe(
        switchMap((todo) => todoService.updateTodo(todo.id!, !todo.completed)),
        tap((todo) => {
          const updatedTodos = store.todos().map((t) => {
            if (t.id === todo.id) {
              return todo;
            }
            return t;
          });
          patchState(store, { todos: updatedTodos });
        })
      )
    ),
  }))
);
