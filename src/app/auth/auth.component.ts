import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private sub: Subscription;
    private storeSub: Subscription;

    constructor(
        // private authService: AuthService,
        // private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if ( this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        // let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if (this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(
                new AuthActions.LoginStart({
                    email,
                    password
                }));
        } else {
            // authObs = this.authService.signup(email, password);
            this.store.dispatch(new AuthActions.SignupStart({email, password}));
        }

        // authObs
        // .subscribe(res => {
        //     console.log(res);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // },
        // errMes => {
        //     this.error = errMes;
        //     this.isLoading = false;
        //     this.showErrorAlert(errMes);
        // });
        form.reset();

    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(error: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = error;
        this.sub = componentRef.instance.closeAlert.subscribe( () => {
            this.sub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }

        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}
