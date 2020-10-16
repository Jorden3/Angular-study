import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  recipes: Recipe[] = [new Recipe('AAAA', 'AAAAA', 'aaaaa'), new Recipe('AAAA', 'AAAAA', 'aaaaa')];

  @Output() recipedWasSelected = new EventEmitter<Recipe>();
  constructor() { 
    
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe:Recipe){
    this.recipedWasSelected.emit(recipe);
  }
}
