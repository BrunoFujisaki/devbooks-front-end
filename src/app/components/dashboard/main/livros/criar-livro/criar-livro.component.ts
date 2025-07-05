import { Component } from '@angular/core';
import { FormularioLivroComponent } from "../formulario-livro/formulario-livro.component";
import { LivroService } from '../../../../../services/livro.service';
import { Router } from '@angular/router';
import { INovoLivro } from '../../../../../interfaces/inovo-livro';

@Component({
  selector: 'app-criar-livro',
  imports: [FormularioLivroComponent],
  templateUrl: './criar-livro.component.html',
  styleUrl: './criar-livro.component.css'
})
export class CriarLivroComponent {

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  criarLivro(livro: INovoLivro) {
    this.livroService.postLivros(livro).subscribe(() => {
      this.router.navigate(['/dashboard/livros']);
    })
  }
}
