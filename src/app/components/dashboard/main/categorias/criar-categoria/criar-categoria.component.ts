import { Component } from '@angular/core';
import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { CategoriaService } from '../../../../../services/categoria.service';
import { ICategoria } from '../../../../../interfaces/icategoria';
import { Router } from '@angular/router';
import { TokenService } from '../../../../../services/token.service';

@Component({
  selector: 'app-criar-categoria',
  imports: [FormularioCategoriaComponent],
  templateUrl: './criar-categoria.component.html',
  styleUrl: './criar-categoria.component.css'
})
export class CriarCategoriaComponent {

  constructor(
    private service: CategoriaService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  criarCategoria(categoria: ICategoria) {
    const token = this.tokenService.retornarToken();
    this.service.postCategoria(categoria).subscribe(() => {
      this.router.navigate(['/dashboard/categorias']);
    });
  }
}
