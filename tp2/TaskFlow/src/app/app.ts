import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewToggle, ViewMode } from './shared/components/view-toggle/view-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ViewToggle, ProjectList, UserList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  view = signal<ViewMode>('task');
}