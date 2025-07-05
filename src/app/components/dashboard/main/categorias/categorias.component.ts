import { Component, OnInit, signal } from '@angular/core';
import { MainComponent } from "../main.component";
import { RouterLink } from '@angular/router';
import { ICategoria } from '../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  imports: [RouterLink, MainComponent],
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
      console.log(categorias);
    })
  }

  excluirCategoria(id: string) {
    this.service.deleteCategoria(id).subscribe(() => {
      this.categorias = this.categorias.filter(c => c.id !== id);
    });
  }
  
}
