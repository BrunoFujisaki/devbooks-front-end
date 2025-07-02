import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from "../modal/modal.component";
import { MainComponent } from "../main/main.component";

@Component({
  selector: 'app-livros',
  imports: [RouterLink, ModalComponent, MainComponent],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent {
  modalAberto = signal(false);

  abrirModal() {
    this.modalAberto.set(true);
  }
}
