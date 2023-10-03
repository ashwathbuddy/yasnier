import { TestBed, waitForAsync, ComponentFixture, inject, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const validUser = {
  username: 'Sergio',
  password: '123456',
};

const blankUser = {
  username: '',
  password: '',
};

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('Login Component Isolated Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FormBuilder, AuthService, { provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('invalid login', fakeAsync(
    inject([AuthService, HttpTestingController], (authService: AuthService, backend: HttpTestingController) => {
      component['onSubmit'](blankUser);
      flushApiResponse(backend, false);
      expect(component.error).toBeTrue();
    }),
  ));

  it('valid login', fakeAsync(
    inject([AuthService, HttpTestingController], (authService: AuthService, backend: HttpTestingController) => {
      component['onSubmit'](validUser);
      flushApiResponse(backend, true);
      expect(component.error).toBeFalse();
      const router: Router = TestBed.inject(Router);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
    }),
  ));

  function updateForm(userEmail: string, userPassword: string) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('Submit button should be enabled when form.valid', () => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('Submit button should be disabled when form.invalid', () => {
    const loginBtn = fixture.debugElement.query(By.css('button'));
    expect((loginBtn.nativeNode.disabled = true)).toBeTruthy();
  });

  it('Submit button should be enabled when form.valid', () => {
    const loginBtn = fixture.debugElement.query(By.css('button'));
    expect((loginBtn.nativeNode.disabled = false)).toBeFalsy();
  });

  it('Form invalid should be true when the form is with blank User', () => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  });
});

function flushApiResponse(backend: HttpTestingController, valid: boolean) {
  const url = AuthService.LOGIN_URL;
  const responseObject = {
    valid: valid,
  };
  const requestWrapper = backend.expectOne({ url: url });
  requestWrapper.flush(responseObject);
}
