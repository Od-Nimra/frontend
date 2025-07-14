import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {
  // Save any object to session storage
  save(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Load an object from session storage
  load<T = any>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Remove item from session storage
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
