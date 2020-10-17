
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../RecipeBook/recipe.service';
import { Recipe } from '../RecipeBook/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipes: RecipeService, private authService: AuthService) {}

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
              this.recipes.addRecipes(recipes);
            }));
      }
}

