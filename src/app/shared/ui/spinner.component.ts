import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-spinner',
  template: `
    <span class="material-symbols-outlined text-slate-400 animate-spin">
      progress_activity
    </span>
  `,
})
export class SpinnerComponent {}
