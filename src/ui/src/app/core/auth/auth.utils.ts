// -----------------------------------------------------------------------------------------------------
// @ AUTH UTILITIES
//
// Methods are derivations of the Auth0 Angular-JWT helper service methods
// https://github.com/auth0/angular2-jwt
// -----------------------------------------------------------------------------------------------------

//TODO: move to libs, when implemented backend support
export class AuthUtils {
  static isTokenExpired(token: string, offsetSeconds?: number): boolean {
    // Return if there is no token
    if (!token || token === '') {
      return true;
    }

    // Get the expiration date
    const date = this._getTokenExpirationDate(token);

    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return true;
    }

    // Check if the token is expired
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

  static getCognitoGroups(token: string) {
    if (!token || token === '') {
      return [];
    }

    const decodedToken = this._decodeToken(token);
    // eslint-disable-next-line no-prototype-builtins
    if (!decodedToken.hasOwnProperty('cognito:groups')) {
      return [];
    }

    return decodedToken['cognito:groups'];
  }

  private static _b64decode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    /* eslint-disable */
    for (
      let bc = 0, bs: any, buffer: any, idx = 0;
      (buffer = str.charAt(idx++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    /* eslint-enable */

    return output;
  }

  private static _b64DecodeUnicode(str: any): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(this._b64decode(str), (c: any) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
  }

  private static _urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw Error('Illegal base64url string!');
      }
    }
    return this._b64DecodeUnicode(output);
  }

  private static _decodeToken(token: string): any {
    // Return if there is no token
    if (!token) {
      return null;
    }

    // Split the token
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error(
        "The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.",
      );
    }

    // Decode the token using the Base64 decoder
    const value = parts[1];
    if (value) {
      const decoded = this._urlBase64Decode(value);
      if (decoded) {
        return JSON.parse(decoded);
      }
    }

    throw new Error('Cannot decode the token.');
  }

  private static _getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this._decodeToken(token);

    // eslint-disable-next-line no-prototype-builtins
    if (!decodedToken.hasOwnProperty('exp')) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  }
}
