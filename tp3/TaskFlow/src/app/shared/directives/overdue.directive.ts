import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appOverdue]' })
export class OverdueDirective {
  @Input() dueDate?: string;
  @Input() done = false;

  @HostBinding('class') get cls(): string {
    if (this.done || !this.dueDate) return '';
    const [y, m, d] = this.dueDate.split('-').map(Number);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return new Date(y, m - 1, d) < today ? 'border-red-500 bg-red-50' : '';
  }
}