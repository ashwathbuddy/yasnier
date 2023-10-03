import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

export type Role = 'admin' | 'installer';

export enum UserProfileStatus {
  Incomplete = 0,
  Complete = 1,
  Verified = 2,
}
export class UserInfo {
  id: string;
  avatar: string;
  name: string;
  email: string;
  status: UserProfileStatus;
  roles: Role[] = [];

  constructor(attrs?: UserAttributes) {
    this.id = attrs?.['sub'] || '';
    this.avatar = attrs?.['avatar'] || '';
    this.name = attrs?.['name'] || '';
    this.email = attrs?.['email'] || '';
    this.status = parseInt(attrs?.['status'] ?? '0', 10);
  }

  isProfileComplete(): boolean {
    return this.status === UserProfileStatus.Verified;
  }

  setRoles(roles: Role[] = []) {
    this.roles = roles;
  }
}
export type UserAttributes = {
  // [key in keyof UserInfo]?: string;
  [key: string]: string;
};

export type UserSession = AuthenticationResultType;

// aux function
export function checkRoles(user: UserInfo | null, allowedRoles?: Role[]): boolean {
  if (!allowedRoles) {
    return true; // no roles required
  }

  return user != null && allowedRoles.some((role: Role) => user.roles.includes(role));
}
