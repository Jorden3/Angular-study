import * as fromShoppingList from '../ShoppingList/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../RecipeBook/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};
