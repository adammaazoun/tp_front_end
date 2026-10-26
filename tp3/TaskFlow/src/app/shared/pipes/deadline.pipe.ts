import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
    transform(value?: string | null): string {
        if (!value) return 'Pas d’échéance';
        const [y, m, d] = value.split('-').map(Number);
        const due = new Date(y, m - 1, d);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
        if (diff === 0) return 'Aujourd’hui';
        if (diff === 1) return 'Demain';
        if (diff > 1) return `Dans ${diff} jours`;
        const n = -diff;
        return `En retard de ${n} jour${n > 1 ? 's' : ''}`;
    }
}