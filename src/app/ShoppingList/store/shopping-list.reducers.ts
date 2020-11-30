import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const intailState: State = {
    ingredients:  [
        new Ingredient('Bbq', 2),
        new Ingredient('salt', 4)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = intailState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: [
                    ...updateIngredients
                ],
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const updatedIngredients = state.ingredients.filter((ig, igIndex) => {
                return igIndex !== state.editedIngredientIndex;
            });

            return {
                ...state,
                ingredients: [
                    ...updatedIngredients
                ],
                editedIngredientIndex: -1,
                editedIngredient: null
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
