import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LogginService } from './logging.service';
import { RecipeService } from './RecipeBook/recipe.service';
import { ShoppingListService } from './ShoppingList/shopping-list.service';

@NgModule({
    providers: [
        ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ]
})
export class CoreModule {}
