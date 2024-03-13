import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div
      class="h-screen dark:bg-slate-800 transition-colors duration-300"
      [ngClass]="{ dark: themeService.dark() }"
    >
      <router-outlet />
    </div>
  `,

  styles: [],
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent {
  themeService = inject(ThemeService);
}
