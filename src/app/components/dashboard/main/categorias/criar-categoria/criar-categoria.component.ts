import { Component } from '@angular/core';
import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { CategoriaService } from '../../../../../services/categoria.service';
import { ICategoria } from '../../../../../interfaces/icategoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-categoria',
  imports: [FormularioCategoriaComponent],
  templateUrl: './criar-categoria.component.html',
  styleUrl: './criar-categoria.component.css'
})
export class CriarCategoriaComponent {

  constructor(
    private service: CategoriaService,
    private router: Router
  ) {}

  criarCategoria(categoria: ICategoria) {
    this.service.postCategoria(categoria).subscribe(() => {
      this.router.navigate(['/dashboard/categorias']);
    });
  }
}
