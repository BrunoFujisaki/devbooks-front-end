import { Component, OnInit, signal } from '@angular/core';
import { MainComponent } from "../main.component";
import { RouterLink } from '@angular/router';
import { ICategoria } from '../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../services/categoria.service';
import { AlertaService } from '../../../../services/alerta.service';

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
    private alertaService: AlertaService
  ) { }

  ngOnInit(): void {
    this.service.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      console.log(categorias);
    })
  }

  async excluirCategoria(id: string) {
    const confirm = await this.alertaService.warning();
    if (confirm) {
      this.service.deleteCategoria(id).subscribe({
        next: () => {
          this.alertaService.success("Livro deletado com sucesso!");
          this.categorias = this.categorias.filter(l => l.id != id);
        },
        error: (erro) => {
          this.alertaService.error(erro.status, erro.error?.message)
        }
      });
    }
  }
}

