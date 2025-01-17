import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as fromApp from '../store/recipe.reducer';
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
          .get<{recipes: Recipe[]}>(
            'https://recipe-book-2ea79.firebaseio.com//recipes.json'
          );
        }),
        map(recipes => {
          return new RecipesActions.SetRecipes(recipes ? recipes.recipes.map(recipe => ({ ingredients: [], ...recipe })): []);
        }
        )
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState] ) => {
        return this.http.put('https://recipe-book-2ea79.firebaseio.com//recipes.json', recipesState);
      })
    );
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.State>) {}
}
