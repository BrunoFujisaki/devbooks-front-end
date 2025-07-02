import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from "../main.component";

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink, MainComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

}
