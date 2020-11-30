import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipesActions from '../RecipeBook/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.userSub = this.store.select('auth').
        pipe(
            map(authState => authState.user)
        )
        .subscribe(
            user => {
                this.isAuthenticated = !user ? false : true;
            }
        );
    }

    onSave() {
        this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetch() {
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipesActions.FecthRecipes());
    }

    onLogout() {
        this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
