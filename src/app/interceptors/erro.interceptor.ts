import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      let errorMessage = 'Um erro desconhecido ocorreu.';

      if (erro.error instanceof ErrorEvent) {
        errorMessage = `Erro do cliente: ${erro.error.message}`;
      } else {
        if (erro.status === 0) {
          errorMessage = 'Não foi possível conectar ao servidor.';
        } else if (erro.status === 401 || erro.status === 403) {
          errorMessage = 'Acesso não autorizado. Faça login novamente.';
        } else {
          errorMessage = `Erro ${erro.status}: ${erro.error?.message || erro.statusText}`;
        }
      }

      console.error(errorMessage);
      return throwError(() => erro);
    })
  );
};