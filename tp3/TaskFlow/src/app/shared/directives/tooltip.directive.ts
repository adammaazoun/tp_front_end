import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({ selector: '[appTooltip]' })
export class TooltipDirective {
  @Input() appTooltip = '';
  private tip: HTMLElement | null = null;
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mouseenter') show() {
    if (!this.appTooltip || this.tip) return;
    this.tip = this.r.createElement('span');
    this.r.appendChild(this.tip, this.r.createText(this.appTooltip));
    'absolute left-0 top-full mt-1 z-10 w-64 rounded bg-gray-800 px-2 py-1 text-xs text-white'
      .split(' ').forEach(c => this.r.addClass(this.tip, c));
    this.r.appendChild(this.el.nativeElement, this.tip);
  }
  @HostListener('mouseleave') hide() {
    if (this.tip) {
      this.r.removeChild(this.el.nativeElement, this.tip);
      this.tip = null;
    }
  }
}