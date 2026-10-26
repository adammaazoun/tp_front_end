import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { NgClass, NgStyle, TitleCasePipe, LowerCasePipe } from '@angular/common';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, NgClass, NgStyle, TitleCasePipe, LowerCasePipe, InitialsPipe, HighlightDirective],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();
  roleColors: Record<string, string> = {
  'Développeur': '#3b82f6',
  'Designer': '#a855f7',
  'Chef de projet': '#ef4444',
  'Testeur': '#22c55e',
};
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