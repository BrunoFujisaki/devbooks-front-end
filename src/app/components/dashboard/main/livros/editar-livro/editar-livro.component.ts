import { Component, OnInit } from '@angular/core';
import { FormularioLivroComponent } from "../formulario-livro/formulario-livro.component";
import { LivroService } from '../../../../../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILivro } from '../../../../../interfaces/ilivro';
import { INovoLivro } from '../../../../../interfaces/inovo-livro';

@Component({
  selector: 'app-editar-livro',
  imports: [FormularioLivroComponent],
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements OnInit {
  
  livro!: ILivro;

  constructor(
    private livroService: LivroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.livroService.getLivro(id).subscribe((livro) => {
        this.livro = livro;
        console.log('ngOnInit: ' + livro)
      });
    }
  }

  atualizarLivro(livro: INovoLivro) {
    this.livroService.putLivros(livro).subscribe(() => {
      this.router.navigate(['/dashboard/livros']);
    })
  }
}
