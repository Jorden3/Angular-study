import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../ShoppingList/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'aaa',
            'aaa',
            'aaa',
            [
                new Ingredient('meat',1),
                new Ingredient('fries', 3)
            ]),
            new Recipe(
                'b',
                'bbb',
                'bbb',
                [
                    new Ingredient('meat', 1),
                    new Ingredient('buns', 2)
                ])];

    constructor(private slService: ShoppingListService) {}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngrediants(ingredients);
    }
}