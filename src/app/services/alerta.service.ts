import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  private swalBase = Swal.mixin({
    background: '#2A2C34',
    color: '#F5F5F5',
    confirmButtonColor: '#c3622d',
    cancelButtonColor: '#FB4141',
    customClass: {
      popup: 'alerta-retro'
    }
  });

  success(titulo: string) {
    return this.swalBase.fire({ icon: 'success', title: titulo });
  }

  error(titulo: string, texto: string) {
    this.swalBase.fire({ icon: 'error', title: titulo, text: texto });
  }

  async warning(): Promise<boolean> {
    const resultado = await this.swalBase.fire({
      title: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`
    });

    return resultado.isConfirmed;
  }
}
