import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroService } from '../../../../../services/livro.service';
import { ILivro } from '../../../../../interfaces/ilivro';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detalhes-livro',
  imports: [CurrencyPipe],
  templateUrl: './detalhes-livro.component.html',
  styleUrl: './detalhes-livro.component.css'
})
export class DetalhesLivroComponent implements OnInit{

  livro!: ILivro;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.livroService.getLivro(id).subscribe((livro) => {
        this.livro = livro;
      });
    }
  }


}
