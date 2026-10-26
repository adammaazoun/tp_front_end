import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  groups = computed(() =>
    this.projects()
      .map(p => ({
        projectName: p.name,
        tasks: p.tasks.filter(t => t.assigneeId === this.user().id),
      }))
      .filter(g => g.tasks.length > 0)
  );

  private allTasks = computed(() => this.groups().flatMap(g => g.tasks));
  todo = computed(() => this.allTasks().filter(t => t.status === 'En attente').length);
  inProgress = computed(() => this.allTasks().filter(t => t.status === 'En cours').length);
  done = computed(() => this.allTasks().filter(t => t.status === 'Terminé').length);
}