import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes.routing.module';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipesComponent,
    ],
    imports: [RouterModule, SharedModule, RecipesRoutingModule]
})

export class RecipesModule {}
