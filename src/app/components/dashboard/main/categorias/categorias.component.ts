import { Component, OnInit, signal } from '@angular/core';
import { MainComponent } from "../main.component";
import { Router, RouterLink } from '@angular/router';
import { ICategoria } from '../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-categorias',
  imports: [RouterLink, MainComponent, ModalComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categorias!: ICategoria[];

  constructor(
    private service: CategoriaService,
  ) {}

  ngOnInit(): void {
    this.service.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    })
  }

  excluirCategoria(id: number | null) {
    this.service.deleteCategoria(Number(id)).subscribe(() => {
      this.categorias = this.categorias.filter(c => c.id !== id);
    });
  }
  
}
