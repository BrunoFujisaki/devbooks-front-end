import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MainComponent } from "../../main.component";
import { ILivro } from '../../../../../interfaces/ilivro';
import { LivroService } from '../../../../../services/livro.service';

@Component({
  selector: 'app-descricao',
  imports: [RouterLink, MainComponent],
  templateUrl: './descricao.component.html',
  styleUrl: './descricao.component.css'
})
export class DescricaoComponent implements OnInit {
  livro!: ILivro;

  constructor(
    private livroService: LivroService,
    private activadedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activadedRoute.snapshot.paramMap.get('id');

    if (id) 
      this.livroService.getLivro(id).subscribe(livro => this.livro = livro);
  }

}
