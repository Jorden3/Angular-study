import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../ShoppingList/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'aaa',
    //         'aaa',
    //         'aaa',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('fries', 3)
    //         ]),
    //         new Recipe(
    //             'b',
    //             'bbb',
    //             'bbb',
    //             [
    //                 new Ingredient('meat', 1),
    //                 new Ingredient('buns', 2)
    //             ]),
    //             new Recipe(
    //                 'b',
    //                 'bbb',
    //                 'bbb',
    //                 [
    //                     new Ingredient('meat', 1),
    //                     new Ingredient('buns', 2)
    //                 ]),
    //                 new Recipe(
    //                     'b',
    //                     'bbb',
    //                     'bbb',
    //                     [
    //                         new Ingredient('meat', 1),
    //                         new Ingredient('buns', 2)
    //                     ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngrediants(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}
