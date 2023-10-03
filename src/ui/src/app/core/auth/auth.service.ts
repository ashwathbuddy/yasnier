import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import {
  AuthFlowType,
  ChangePasswordCommand,
  CognitoIdentityProviderClient,
  GetUserCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { Account } from '../../../../../../libs/data-model/src/models';
import { BehaviorSubject } from 'rxjs';
import { AuthUtils } from './auth.utils';
import { UserInfo, UserSession, UserAttributes } from '../../core/auth/auth.types';
import { LocalStore } from '../storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this.userSubject.asObservable();

  private config = environment.cognito;
  private idpClient: CognitoIdentityProviderClient;

  private sessionStore: LocalStore<UserSession> = new LocalStore('user-session');
  // private userStore: LocalStore<UserInfo> = new LocalStore('user-info');

  constructor() {
    this.idpClient = new CognitoIdentityProviderClient({ region: this.config.Region });

    // const user = this.userStore.get();
    // if (user) {
    //   this.userSubject.next(user);
    // }
  }

  public async login(username: string, password: string): Promise<void> {
    if (!username || !password) throw new Error('AuthService: invalid login parameters');

    const initiateAuthCommand = new InitiateAuthCommand({
      //https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html
      //https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider/classes/initiateauthcommand.html
      ClientId: this.config.AppClientId,
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.initiateAuth(initiateAuthCommand);
      const userSession = response.AuthenticationResult as UserSession;
      this.sessionStore.save(userSession);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  private async autoLogin(sessionData?: UserSession) {
    // TODO ensure token is not expired

    // already known user, just refresh token
    if (!sessionData?.RefreshToken) throw new Error('invalid operation: refresh token is null at autologin');

    const authCommand = new InitiateAuthCommand({
      ClientId: this.config.AppClientId,
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      AuthParameters: {
        REFRESH_TOKEN: sessionData.RefreshToken,
      },
    });

    let response: InitiateAuthCommandOutput;
    try {
      response = await this.initiateAuth(authCommand);
    } catch (error) {
      console.error('Error refreshing session:', error);
      throw error;
    }

    const newSession = response.AuthenticationResult as UserSession;
    return this.sessionStore.update(newSession);
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const accessToken = this.sessionStore.get()?.AccessToken; // FIXME:
    const changePasswordCommand = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    });

    try {
      await this.idpClient.send(changePasswordCommand);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    const session = await this.getCurrentSession();
    if (session) {
      const globalSignOutCommand = new GlobalSignOutCommand({
        AccessToken: session.AccessToken,
      });

      try {
        await this.idpClient.send(globalSignOutCommand);
      } catch (error) {
        console.error('Error logging out:', error);
        throw error;
      }

      this.sessionStore.clear();
    }

    this.userSubject.next(null);
  }

  private async getCurrentSession() {
    // Check the access token availability
    let session = this.sessionStore.get();
    if (!session?.AccessToken) {
      return null; //throw new Error('invalid session data');
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(session.AccessToken)) {
      this.clearUserSession();
      return null;
    }

    // If the access token exists, and it didn't expire, sign in using it
    session = await this.autoLogin(session);
    return session;
  }

  public async authenticatedUser(): Promise<UserInfo | null> {
    // Check if the user is logged in
    let user = this.userSubject.value; // this.userStore.get();
    if (user) return user;

    const session = await this.getCurrentSession();
    if (!session) return null;

    // update user behavior subject
    user = await this.getUserAttributes(session);
    this.userSubject.next(user); // this.userStore.save(user);
    return user;
  }

  getUser(): Account {
    const userInfo = this.userSubject.getValue();
    if (userInfo) {
      const acc = {
        id: userInfo.id,
      };
      const account = acc as Account;
      return account;
    }
    // TODO
    throw new Error('Invalid call to getUser in a context where the user not implemented.');
  }

  private async initiateAuth(initiateAuthCommand: InitiateAuthCommand) {
    let response: InitiateAuthCommandOutput;
    try {
      response = await this.idpClient.send(initiateAuthCommand);
    } catch (error) {
      console.error('Auth Error', error);
      throw error;
    }

    // TODO run and process result (all options)

    /*    { // InitiateAuthResponse
      ChallengeName: "SMS_MFA" || "SOFTWARE_TOKEN_MFA" || "SELECT_MFA_TYPE" || "MFA_SETUP" || "PASSWORD_VERIFIER" || "CUSTOM_CHALLENGE" || "DEVICE_SRP_AUTH" || "DEVICE_PASSWORD_VERIFIER" || "ADMIN_NO_SRP_AUTH" || "NEW_PASSWORD_REQUIRED",
      Session: "STRING_VALUE",
      ChallengeParameters: { // ChallengeParametersType
        "<keys>": "STRING_VALUE",
      },
      AuthenticationResult: { // AuthenticationResultType
        AccessToken: "STRING_VALUE",
        ExpiresIn: Number("int"),
        TokenType: "STRING_VALUE",
        RefreshToken: "STRING_VALUE",
        IdToken: "STRING_VALUE",
        NewDeviceMetadata: { // NewDeviceMetadataType
          DeviceKey: "STRING_VALUE",
          DeviceGroupKey: "STRING_VALUE",
        },
      },
    };*/
    if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      throw new Error('New password required');
    }
    return response;
  }

  private async getUserAttributes(authResult: UserSession) {
    if (!authResult?.AccessToken) throw new Error('invalid access token');

    const getUserCommand = new GetUserCommand({
      AccessToken: authResult.AccessToken,
    });

    let attributesMap = null;
    try {
      const response = await this.idpClient.send(getUserCommand);
      attributesMap = response.UserAttributes?.reduce((map, attribute) => {
        if (attribute?.Name && attribute.Value) {
          map[attribute.Name] = attribute.Value;
        }
        return map;
      }, {} as UserAttributes);
      if (!attributesMap) throw new Error('unable to get user attributes');
    } catch (error) {
      console.error('Error fetching user attributes:', error);
      throw error;
    }

    const userInfo = new UserInfo(attributesMap);
    userInfo.setRoles(AuthUtils.getCognitoGroups(authResult.AccessToken));

    return userInfo;
  }

  // public isUserAuthenticated(sd: UserSession | null): boolean {
  //   if (!sd) {
  //     sd = this.getUserSession();
  //   }
  //   // Check if tokens are present and not expired
  //   return !!sd && !!sd.AccessToken && !!sd.IdToken && !AuthUtils.isTokenExpired(sd.AccessToken, sd.ExpiresIn);
  // }

  private clearUserSession(): void {
    LocalStore.clearAll();
  }

  // parseJwt(token: string) {
  //   const base64Url = token.split('.')[1] || '';
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join(''),
  //   );

  //   return JSON.parse(jsonPayload);
  // }
  // parseJwt(token: string) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
}
