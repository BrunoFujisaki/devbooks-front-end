import { Component } from '@angular/core';
import { MainComponent } from "../../main.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-endereco',
  imports: [MainComponent, RouterLink],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {

}
