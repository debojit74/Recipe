import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
      const token = this.authService.getToken();
      return this.httpClient.put('https://recipe-9ec94.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>('https://recipe-9ec94.firebaseio.com/recipes.json?auth=' + token).
        pipe(map(
            (recipes) => {
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
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

        // this.httpClient.get('https://recipe-9ec94.firebaseio.com/recipes.json?auth=' + token, {
        //     observe: 'response',
        //     responseType: 'text'
        // }).
        // pipe(map(
        //     (recipes) => {
        //         console.log(recipes);
        //         // for(let recipe of recipes){
        //         //     if(!recipe['ingredients']){
        //         //         recipe['ingredients'] = [];
        //         //     }
        //         // }
        // return [];
        //     }));
        // // )).subscribe(
        // //     (recipes: Recipe[]) => {
        // //         this.recipeService.setRecipes(recipes);
        // //     }
        // //);
    }
}