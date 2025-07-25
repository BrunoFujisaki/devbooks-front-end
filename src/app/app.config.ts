import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { autenticacaoInterceptor } from './interceptors/autenticacao.interceptor';
import { erroInterceptor } from './interceptors/erro.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([autenticacaoInterceptor, erroInterceptor])
    )
  ]
};
