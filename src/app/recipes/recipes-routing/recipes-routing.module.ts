import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../recipes.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipesRoutes) // forRoot() should be used only in app.module. for rest all modules, should be forChild()
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AuthGuardService]
})
export class RecipesRoutingModule { }
