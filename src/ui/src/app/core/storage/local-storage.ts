// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class LocalStore<T> {
  constructor(private storageKey: string) {}

  static clearAll(): void {
    localStorage.clear();
  }

  public save(data: T): void {
    if (!data) return;
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(this.storageKey, this.encrypt(serializedData));
    } catch (error) {
      console.error('Error storing session data:', error);
      throw error;
    }
  }

  public update(data: T): T {
    if (!data) throw new Error('null argument');

    const oldData = this.get();
    if (oldData) {
      const mergeObjects = <T>(left: T, right: Partial<T>): T => ({ ...left, ...right });
      data = mergeObjects(oldData, data);
    }

    this.save(data);
    return data;
  }

  public get(): T | null {
    const sessionData = localStorage.getItem(this.storageKey);
    if (!sessionData) {
      return null;
    }
    try {
      const data: T = JSON.parse(this.decrypt(sessionData));
      return data;
    } catch (error) {
      throw new Error('Error parsing session data: ' + error);
    }
  }

  public clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  // TODO move to a new file
  private encrypt(data: string) {
    // FIXME: Store session data securely, e.g., using HttpOnly cookies, local storage, or state management
    // Serialize and encrypt session data to prevent XSS
    return data;
  }

  private decrypt(data: string) {
    // FIXME: Store session data securely, e.g., using HttpOnly cookies, local storage, or state management
    // Serialize and encrypt session data to prevent XSS
    return data;
  }
}
