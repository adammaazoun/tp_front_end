import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
    transform(value?: string | null): string {
        if (!value?.trim()) return '?';
        return value.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
    }
}