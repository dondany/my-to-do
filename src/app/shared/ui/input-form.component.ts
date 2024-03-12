import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input-form',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="p-2 w-full flex items-center justify-between gap-3 rounded-full
      bg-slate-100
      dark:bg-slate-900"
    >
      <input
        type="text"
        formControlName="text"
        class="px-4 flex-grow bg-transparent outline-none 
        text-slate-500
        dark:text-slate-300"
        [placeholder]="placeholder()"
      />
      <button
        type="submit"
        class="p-1 flex justify-center items-center bg-blue-300 rounded-full"
      >
        <span class="material-symbols-outlined text-white"> add </span>
      </button>
      <div class=""></div>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class InputFormComponent {
  placeholder = input<string>('Add item...');
  @Output() addItem: EventEmitter<string> = new EventEmitter();

  form = inject(FormBuilder).group({
    text: ['', Validators.required],
  });

  get text() {
    return this.form.get('text')!;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.addItem.emit(this.text.getRawValue());
    this.form.reset();
  }
}
