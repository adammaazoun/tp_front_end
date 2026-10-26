import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../models/task.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.html',
    styleUrl: './task-list.css'
})
export class TaskList {
    tasks = input.required<Task[]>();
    showAssignee = input(true);

    private userService = inject(UserService);
    users = toSignal(this.userService.getUsers(), { initialValue: [] });

    assigneeName(id?: number): string {
        return this.users().find(u => u.id === id)?.name ?? 'Non assignée';
    }
}