import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: UserFormComponent },
  { path: 'users', component: UserListComponent },
  // { path: 'users/edit', component: UserEditComponent },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];
