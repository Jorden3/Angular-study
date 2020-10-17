import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './RecipeBook/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './RecipeBook/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './RecipeBook/recipe-start/recipe-start.component';
import { RecipesResolverService } from './RecipeBook/recipes-resolver.service';
import { RecipesComponent } from './RecipeBook/recipes/recipes.component';
import { ShoppingListComponent } from './ShoppingList/shopping-list/shopping-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent },
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent , resolve: [RecipesResolverService]}
  ] },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
