export interface IResponse<T> {
  data: T;
  code: string;
  error: string;
}

// TODO: for implementing authorization
export interface AuthResponse {
  uuid?: string;
  valid: boolean;
  uid?: string;
  username?: string;
  password?: string;
  token?: string;
  message?: string;
  status?: number;
}
