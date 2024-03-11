import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from './model/todo';
import { TodoService } from './todo.service';
import { computed, inject } from '@angular/core';
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
    setTodos: rxMethod<Todo[]>(
      pipe(tap((todos) => patchState(store, { todos })))
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
    deleteTodo: rxMethod<string>(
      pipe(
        switchMap((id) => {
          return todoService.deleteTodo(id).pipe(
            tap(() =>
              patchState(store, {
                todos: [...store.todos().filter((t) => t.id !== id)],
              })
            )
          );
        })
      )
    ),
  })),
  withComputed(({ todos }) => ({
    activeTodos: computed(() => todos().filter((t) => !t.completed)),
    completedTodos: computed(() => todos().filter((t) => t.completed)),
  }))
);
