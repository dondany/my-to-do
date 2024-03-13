import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconButtonComponent } from './icon-button.component';

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
        class="px-1 flex-grow bg-transparent outline-none 
        text-slate-500
        dark:text-slate-300"
        [placeholder]="placeholder()"
      />
      <app-icon-btn icon="add" type="submit" colorClass="bg-blue-300" />
    </form>
  `,
  imports: [ReactiveFormsModule, IconButtonComponent],
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
