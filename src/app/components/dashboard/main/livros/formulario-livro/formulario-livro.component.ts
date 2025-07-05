import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategoria } from '../../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { ILivro } from '../../../../../interfaces/ilivro';
import { INovoLivro } from '../../../../../interfaces/inovo-livro';

@Component({
  selector: 'app-formulario-livro',
  imports: [RouterLink, FormsModule],
  templateUrl: './formulario-livro.component.html',
  styleUrl: './formulario-livro.component.css'
})
export class FormularioLivroComponent implements OnInit, OnChanges {
  livro = input<ILivro | null>(null);
  categorias!: ICategoria[];
  submitForm = output<INovoLivro>();
  livroForm = {
    id: '',
    titulo: '',
    autor: '',
    categoria: '',
    descricao: '',
    estoque: 0,
    valor: 0,
    imagem: ''
  }

  constructor(
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.livro());
    if (changes['livro'] && this.livro()) {
      console.log(this.livro());
      this.livroForm = {
        id: this.livro()?.id || '',
        titulo: this.livro()?.titulo || '',
        autor: this.livro()?.autor || '',
        categoria: this.livro()?.categoria.id || '',
        descricao: this.livro()?.descricao || '',
        estoque: this.livro()?.estoque || 0,
        valor: this.livro()?.valor || 0,
        imagem: this.livro()?.imagem || ''
      }
    }
  }

  emitirLivro() {
    const livro = {
      ...this.livroForm,
    };
    this.submitForm.emit(livro);
  }
}
