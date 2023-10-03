import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, distinctUntilChanged, map } from 'rxjs';
import { Role, UserInfo, checkRoles } from './auth.types';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appShowForRoles]',
  standalone: true,
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('appShowForRoles') allowedRoles?: Role[];
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
  ) {}

  ngOnInit() {
    console.log('ShowForRolesDirective ngOnInit');
    this.sub = this.authService.user$
      .pipe(
        map((user: UserInfo | null) => checkRoles(user, this.allowedRoles)),
        distinctUntilChanged(),
      )
      .subscribe((hasAccess: boolean) => {
        if (hasAccess) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
