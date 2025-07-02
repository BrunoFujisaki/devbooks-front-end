import { Component } from '@angular/core';
import { MainComponent } from "../main.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [RouterLink, MainComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

}
