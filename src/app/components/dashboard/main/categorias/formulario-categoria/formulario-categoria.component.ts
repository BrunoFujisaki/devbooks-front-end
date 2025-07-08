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
  categoriaForm = {
    id: '',
    nome: ''
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoria'] && this.categoria()) {
      this.categoriaForm = {
        id: this.categoria()?.id || '',
        nome: this.categoria()?.nome || '',
      }
    }
  }

  emitirCategoria() {
    const categoria = {
      ...this.categoriaForm
    }
    this.submitForm.emit(categoria);
  }
}
