import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ThemeService } from '../shared/theme.service';
import { InputFormComponent } from '../shared/ui/input-form.component';
import { TodoListComponent } from './checklist/todo/ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="w-full flex justify-center">
    <div class="w-96 mt-2 flex flex-col">
      <div class="w-full h-14 flex justify-between items-center text-slate-400">
        @if (route.firstChild?.url | async; as urlSegments) { @if
        (urlSegments.length > 1 ) {
        <button class="flex items-center gap-1" routerLink="../">
          <span class="material-symbols-outlined text-lg"> arrow_back </span>
          <span>Back</span>
        </button>
        } }

        <button
          (click)="themeService.toggle()"
          class="ml-auto text-white border-slate-400/70 bg-slate-400 rounded-full w-8 h-8 text-sm"
        >
          @if (themeService.dark()) {
          <span class="material-symbols-outlined text-lg"> light_mode </span>
          } @else {

          <span class="material-symbols-outlined text-lg"> dark_mode </span>
          }
        </button>
      </div>
      <router-outlet />
    </div>
  </div>`,
  imports: [
    RouterOutlet,
    TodoListComponent,
    InputFormComponent,
    CommonModule,
    RouterLink,
  ],
})
export default class HomeComponent {
  themeService = inject(ThemeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
}
