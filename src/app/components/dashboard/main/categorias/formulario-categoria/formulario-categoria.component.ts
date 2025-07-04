import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICategoria } from '../../../../../interfaces/icategoria';

@Component({
  selector: 'app-formulario-categoria',
  imports: [RouterLink, FormsModule],
  templateUrl: './formulario-categoria.component.html',
  styleUrl: './formulario-categoria.component.css'
})
export class FormularioCategoriaComponent implements OnChanges{
  categoria = input<ICategoria | null>(null);
  submitForm = output<ICategoria>();
  id: number | null = null;
  nome: string = '';
  quantidadeLivros: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoria'] && this.categoria()) {
      this.id = this.categoria()?.id || null;
      this.nome = this.categoria()?.nome || '';
      this.quantidadeLivros = this.categoria()?.quantidadeLivros || null;
    }
  }

  emitirCategoria() {
    const categoria:ICategoria = {
      id: this.id,
      nome: this.nome,
      quantidadeLivros: this.quantidadeLivros
    }
    this.submitForm.emit(categoria);
  }
}
