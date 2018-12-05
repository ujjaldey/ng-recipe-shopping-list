import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, ingredients: [...state.ingredients, action.payload] // ... is called spread operator
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, ingredients: [...state.ingredients, ...action.payload] // ... is called spread operator
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient, ...action.payload.ingredient
            };
            const stateIngredients = [...state.ingredients];
            stateIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state, ingredients: stateIngredients, editedIngredient: null, editedIngredientIndex: -1 // ... is called spread operator
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1)
            return {
                ...state, ingredients: oldIngredients, editedIngredient: null, editedIngredientIndex: -1 // ... is called spread operator
            };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload] };
            return {
                ...state, editedIngredient: editedIngredient, editedIngredientIndex: action.payload // ... is called spread operator
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state, editedIngredient: null, editedIngredientIndex: -1 // ... is called spread operator
            };
        default: {
            return state;
        }
    }
    return state;
}