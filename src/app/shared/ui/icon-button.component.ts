import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-icon-btn',
  template: ` <button
    [type]="type"
    class="text-white border-slate-400/70  rounded-full w-8 h-8 text-sm"
    [ngClass]="colorClass()"
  >
    <span class="material-symbols-outlined text-lg">{{ icon() }}</span>
  </button>`,
  imports: [CommonModule],
})
export class IconButtonComponent {
  icon = input.required<string>();
  type = input<string>('button');
  colorClass = input<string>('bg-slate-300');
}
