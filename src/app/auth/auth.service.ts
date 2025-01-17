import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.action';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTime: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzDou_kDFBCMtzV97dW7gQqo7CLCu2DJE',
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
               this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzDou_kDFBCMtzV97dW7gQqo7CLCu2DJE',
        {
            email,
            password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    logout() {
        // this.user.next(null);
        this.store.dispatch(new fromAuth.Logout());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
        }
        this.tokenExpirationTime = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.store.dispatch(new fromAuth.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTime) {
            this.tokenExpirationTime = null;
        }
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new fromAuth.AuthenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate),
                redirect: false
            }));
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        // this.user.next(user);
        this.store.dispatch(new fromAuth.AuthenticateSuccess({
            email,
            userId,
            token,
            expirationDate,
            redirect: true
        }));
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }

        return throwError(errorMessage);
    }
}
