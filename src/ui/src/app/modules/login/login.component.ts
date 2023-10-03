import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
//TODO add     // encapsulation: ViewEncapsulation.None,

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    // MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule,
    RouterModule,
  ],
})
export class LoginComponent {
  error = false;
  showPassword = false;
  originalUrl: string | null;
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.originalUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
  }

  async onSubmit(data: { username: string; password: string }) {
    this.loginForm.disable();
    this.error = false;
    try {
      await this.authService.login(data.username, data.password);

      const user = await this.authService.authenticatedUser();
      if (!user) throw new Error('logic error'); // TODO: unify with login call?

      // If has not completed profile, navigate to a profile route
      // if (!user.isProfileComplete()) {
      //   this.router.navigate(['login-profile-redirect']);
      // } else {
      // After successful login, navigate back to the original URL
      if (this.originalUrl) {
        this.router.navigateByUrl(this.originalUrl);
      } else {
        // If no original URL, navigate to a default route
        this.router.navigate(['login-default-redirect']);
      }
      // }
    } catch (error) {
      this.loginForm.enable();
      this.loginForm.reset();
      this.error = true;
      // TODO: console.error('There was an error!', error); // Handle login error
    }
  }
}
