import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="text" />
      <button type="submit">
        <span class="material-symbols-outlined"> add </span>
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
