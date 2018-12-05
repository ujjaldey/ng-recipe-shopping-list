import { Injectable } from '@angular/core';
import { Actions, Effect } from "@ngrx/effects";
import * as RecipeActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
// import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            })

        }))
        .pipe(map(
            (recipes) => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        ));

    @Effect({ dispatch: false })
    recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')))
        .pipe(switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json',
                state.recipes, {
                    reportProgress: true
                });
            return this.httpClient.request(req);
        }));
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}