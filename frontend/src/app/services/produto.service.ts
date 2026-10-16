import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CriarProduto, Produto } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/produtos`;

  listar(despensaId: number): Observable<Produto[]> {
    const params = new HttpParams().set('despensaId', despensaId);
    return this.http.get<Produto[]>(this.url, { params });
  }

  criar(payload: CriarProduto): Observable<Produto> {
    return this.http.post<Produto>(this.url, payload);
  }
}
