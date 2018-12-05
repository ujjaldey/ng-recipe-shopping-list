import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe 1', 'This is an awesome recipe 1', 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2018%2F02%2Fmain%2F2548601_qfsba_rice_with_scallops_152.jpg%3Fitok%3Dqvkz_lUq&w=700&q=85', [new Ingredient('Meat', 1), new Ingredient('Buns', 13)]),
        new Recipe('A Test Recipe 2', 'This is an awesome recipe 2', 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2017%2F07%2Fmain%2Fshrimp_fried_rice_2525601_onean_0088.jpg%3Fitok%3DZz0mHMdR&w=700&q=85', [new Ingredient('Fries', 20), new Ingredient('Pasta', 11)]),
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes]
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes

            }
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes]
            oldRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return state;
    }
}