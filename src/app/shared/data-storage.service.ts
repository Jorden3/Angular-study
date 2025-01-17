import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../RecipeBook/recipe.service';
import { Recipe } from '../RecipeBook/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../RecipeBook/store/recipe.actions';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
      private http: HttpClient,
      private recipes: RecipeService,
      private authService: AuthService,
      private store: Store<fromApp.AppState>) {}

    storeRecipes() {
        const recipes = this.recipes.getRecipes();
        this.http.put('https://recipe-book-2ea79.firebaseio.com//recipes.json', recipes)
        .subscribe(
            response => console.log(response)
        );
    }

    fetchRecipes() {
        return this.http
          .get<Recipe[]>(
            'https://recipe-book-2ea79.firebaseio.com//recipes.json'
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              // this.recipes.addRecipes(recipes);
              this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            }));
      }
}

