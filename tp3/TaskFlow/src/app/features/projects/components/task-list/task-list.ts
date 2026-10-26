import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgClass } from '@angular/common';
import { Task } from '../../models/task.model';
import { UserService } from '../../../../core/services/user.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [DatePipe, NgClass, TruncatePipe, DeadlinePipe,
        HighlightDirective, OverdueDirective, TooltipDirective],
    templateUrl: './task-list.html',
    styleUrl: './task-list.css'
})
export class TaskList {
    tasks = input.required<Task[]>();
    showAssignee = input(true);

    statusBorder: Record<string, string> = {
        'En attente': 'border-gray-400',
        'En cours': 'border-blue-500',
        'Terminé': 'border-green-500',
    };

    private userService = inject(UserService);
    users = toSignal(this.userService.getUsers(), { initialValue: [] });

    assigneeName(id?: number): string {
        return this.users().find(u => u.id === id)?.name ?? 'Non assignée';
    }
}