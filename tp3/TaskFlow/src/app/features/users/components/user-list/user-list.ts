import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';
import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, EmptyState],
  templateUrl: './user-list.html',
})
export class UserList {
  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  users = toSignal(this.userService.getUsers(), { initialValue: [] });
  projects = toSignal(this.projectService.getProjects(), { initialValue: [] });

  search = signal('');
  filteredUsers = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  });
}