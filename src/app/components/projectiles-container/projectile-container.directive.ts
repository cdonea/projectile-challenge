import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class ProjectileDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}