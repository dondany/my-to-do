import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="p-2 w-full flex items-center justify-between gap-3 bg-slate-900 rounded-full"
    >
      <input
        type="text"
        formControlName="text"
        class="px-4 flex-grow bg-transparent outline-none text-slate-300"
        placeholder="Add item..."
      />
      <button
        type="submit"
        class="p-1 flex justify-center items-center bg-blue-300 rounded-full"
      >
        <span class="material-symbols-outlined text-white"> add </span>
      </button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class TodoFormComponent {
  @Output() addTodo: EventEmitter<string> = new EventEmitter();

  form = inject(FormBuilder).group({
    text: ['', Validators.required],
  });

  get text() {
    return this.form.get('text')!;
  }

  onSubmit() {
    this.addTodo.emit(this.text.getRawValue());
    this.form.reset();
  }
}
