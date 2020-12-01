import { Component, OnInit } from '@angular/core';
import { LogginService } from 'src/app/logging.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private logginService: LogginService) { }

  ngOnInit() {
    this.logginService.printLog('Hello from recipes component');
  }


}
