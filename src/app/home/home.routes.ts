import { Route } from '@angular/router';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
    children: [
      {
        path: '',
        redirectTo: 'checklist',
        pathMatch: 'full',
      },
      {
        path: 'checklist',
        loadComponent: () => import('./checklist/checklist.component'),
      },
      {
        path: 'checklist/:id',
        loadComponent: () => import('./checklist/todo/todo.component'),
      },
    ],
  },
];
