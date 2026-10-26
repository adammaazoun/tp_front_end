import { Component, input, output } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
    selector: 'app-view-toggle',
    standalone: true,
    templateUrl: './view-toggle.html'
})
export class ViewToggle {
    current = input<ViewMode>('task');
    changed = output<ViewMode>();
}