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
import { IconButtonComponent } from '../shared/ui/icon-button.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `<div class="w-full flex justify-center">
    <div class="w-96 mt-2 flex flex-col">
      <div class="w-full h-14 flex justify-between items-center text-slate-400">
        @if (route.firstChild?.url | async; as urlSegments) { @if
        (urlSegments.length > 1 ) {
        <app-icon-btn icon="arrow_back" routerLink="../" />
        } }

        <app-icon-btn
          [icon]="themeService.dark() ? 'light_mode' : 'dark_mode'"
          (click)="themeService.toggle()"
          class="ml-auto"
        />
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
    IconButtonComponent,
  ],
})
export default class HomeComponent {
  themeService = inject(ThemeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
}
