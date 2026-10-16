import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CriarDespensa, Despensa } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DespensaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/despensas`;

  listar(): Observable<Despensa[]> {
    return this.http.get<Despensa[]>(this.url);
  }

  criar(payload: CriarDespensa): Observable<Despensa> {
    return this.http.post<Despensa>(this.url, payload);
  }
}
