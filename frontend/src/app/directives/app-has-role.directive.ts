import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class AppHasRoleDirective {

  role: string = "admin";

  constructor(
  private templateRef: TemplateRef<any>,
  private viewContainerRef: ViewContainerRef) { }

@Input() set appHasRole(expectedRole: string) {
  if (this.role == expectedRole) { 
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainerRef.clear();
  }
}

}
