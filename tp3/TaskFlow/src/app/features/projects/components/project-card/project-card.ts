import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { DatePipe, UpperCasePipe, CurrencyPipe, PercentPipe, DecimalPipe,
         SlicePipe, KeyValuePipe, NgStyle } from '@angular/common';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList, HighlightDirective, DatePipe, UpperCasePipe, CurrencyPipe,
            PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe, NgStyle],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  get rate(): number {
    const t = this.project().tasks;
    return t.length ? t.filter(x => x.status === 'Terminé').length / t.length : 0;
  }

  get avgCost(): number {
    const p = this.project();
    return p.tasks.length ? p.budget / p.tasks.length : 0;
  }

  get barColor(): string {
    const p = this.rate * 100;
    return p < 34 ? '#ef4444' : p <= 66 ? '#f59e0b' : '#22c55e';
  }

  get byPriority(): Record<string, number> {
    const r: Record<string, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    this.project().tasks.forEach(t => r[t.priority]++);
    return r;
  }

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}