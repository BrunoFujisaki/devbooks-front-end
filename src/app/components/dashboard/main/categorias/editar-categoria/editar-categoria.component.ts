import { Component, OnInit } from '@angular/core';
import { FormularioCategoriaComponent } from "../formulario-categoria/formulario-categoria.component";
import { ICategoria } from '../../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  imports: [FormularioCategoriaComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  categoria!: ICategoria;

  constructor(
    private service: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.service.getCategoriaPorId(Number(id)).subscribe((categoria) => {
        this.categoria = categoria;
      });
    }
  }

  atualizarCategoria(categoria: ICategoria) {
    this.service.putCategoria(categoria).subscribe(() => {
      this.router.navigate(['/dashboard/categorias']);
    })
  }

}
