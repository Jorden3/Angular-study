import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipe.actions';

export interface State {
    recipes: Recipe[];
}

const intailState: State = {
    recipes: []
};

export function recipeReducer(state = intailState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesActions.FETCH_RECIPES:
            return {
                ...state
            };
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const updateRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updateRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };

        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            };
        default:
            return state;
    }
}
