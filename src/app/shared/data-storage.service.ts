import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    // return this.httpClient.put('https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   // observe: 'events'
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: new HttpHeaders().set('Authorization', 'Bearer sdfsdgfsdfsdfsdf')
    // });

    const req = new HttpRequest('PUT', 'https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-shopping-list-ud01.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )).subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
