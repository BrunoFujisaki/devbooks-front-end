import { Component } from '@angular/core';
import { MainComponent } from "../main.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [MainComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
