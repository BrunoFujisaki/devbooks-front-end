import { Component } from '@angular/core';
import { MainComponent } from "../../main.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  imports: [MainComponent, RouterLink],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {

}
