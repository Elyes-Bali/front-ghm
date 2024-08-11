import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8085/vita/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', { username, password }, httpOptions).pipe(
      tap(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.isLoggedInSubject.next(true); 
        // Notify that user is logged in
      })
    );
  }

  register(username: string, email: string, password: string, mfaEnabled: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password, mfaEnabled }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.isLoggedInSubject.next(false); // Notify that user is logged out
      })
    );
  }

  verifyCode(verifyRequest: { username: string; code: string }): Observable<any> {
    return this.http.post(AUTH_API + 'verify', verifyRequest);
  }

  forgetpassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'forgetpassword', { email });
  }

  resetpassword(token: any, password: any): Observable<any> {
    return this.http.put(AUTH_API + 'resetpassword', { token, password });
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.post(AUTH_API + 'activate', token);
  }

  private isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
