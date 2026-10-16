import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DespensaService } from '../services/despensa.service';
import { Despensa } from '../models';
import { environment } from '../../environments/environment';

interface ItemCompra { id:number; despensaId:number; nome:string; quantidade?:string|null; comprado:boolean; }
@Component({
  standalone:true, selector:'app-lista-compras', imports:[FormsModule],
  template:`
    <div class="page-heading"><div><div class="eyebrow">PLANEJAMENTO DA CASA</div><h1>Lista de compras</h1><p class="muted">Compartilhe a lista e marque os itens conforme compra.</p></div></div>
    <section class="panel">
      <div class="product-form">
        <div class="field"><label for="shoppingPantry">Despensa</label><select id="shoppingPantry" name="shoppingPantry" [(ngModel)]="despensaId" (ngModelChange)="carregar()"><option [ngValue]="null">Selecione</option>@for(d of despensas;track d.id){<option [ngValue]="d.id">{{d.nome}}</option>}</select></div>
        <div class="field"><label for="shoppingName">Item</label><input id="shoppingName" name="shoppingName" [(ngModel)]="nome" placeholder="Ex.: Leite" maxlength="140"></div>
        <div class="field"><label for="shoppingQty">Quantidade</label><input id="shoppingQty" name="shoppingQty" [(ngModel)]="quantidade" placeholder="Ex.: 2 caixas" maxlength="30"></div>
        <div class="field wide form-actions"><button class="button primary" (click)="adicionar()" [disabled]="!despensaId || !nome.trim() || saving">{{saving?'Adicionando…':'＋ Adicionar à lista'}}</button></div>
      </div>
      @if(feedback){<div class="notice" [class.error]="erro" [class.success]="!erro">{{feedback}}</div>}
      <div class="panel-heading" style="margin-top:22px"><div><h2>Itens da lista</h2><p class="muted">{{pendentes}} pendente(s) · {{comprados}} comprado(s)</p></div></div>
      @if(!despensaId){<div class="empty-state"><strong>Escolha uma despensa</strong><p>Os itens da lista são organizados por despensa.</p></div>}
      @else if(!itens.length){<div class="empty-state"><strong>Lista vazia</strong><p>Adicione os itens que precisam ser comprados.</p></div>}
      @else {<div class="pantry-list">@for(i of itens;track i.id){<div class="pantry-row"><input style="width:17px;height:17px" type="checkbox" [checked]="i.comprado" (change)="marcar(i,$any($event.target).checked)" [attr.aria-label]="'Marcar '+i.nome+' como comprado'"><div class="row-main"><strong [style.text-decoration]="i.comprado?'line-through':'none'">{{i.nome}}</strong><small>{{i.quantidade || 'Quantidade não definida'}}</small></div><button class="icon-button" (click)="excluir(i)" aria-label="Excluir item">×</button></div>}</div>}
    </section>`
})
export class ListaComprasComponent implements OnInit {
  private readonly http=inject(HttpClient); private readonly despensaService=inject(DespensaService);
  despensas:Despensa[]=[]; itens:ItemCompra[]=[]; despensaId:number|null=null; nome=''; quantidade=''; feedback=''; erro=false; saving=false;
  get pendentes(){return this.itens.filter(i=>!i.comprado).length}
  get comprados(){return this.itens.filter(i=>i.comprado).length}
  ngOnInit(){this.despensaService.listar().subscribe({next:d=>{this.despensas=d;if(d.length){this.despensaId=d[0].id;this.carregar()}},error:()=>this.mensagem('Não foi possível carregar as despensas.',true)})}
  carregar(){if(!this.despensaId){this.itens=[];return}const p=new HttpParams().set('despensaId',this.despensaId);this.http.get<ItemCompra[]>(`${environment.apiUrl}/lista-compras`,{params:p}).subscribe({next:i=>this.itens=i,error:()=>this.mensagem('Falha ao carregar lista. Confira se a API está atualizada.',true)})}
  adicionar(){if(!this.despensaId||!this.nome.trim())return;this.saving=true;this.http.post<ItemCompra>(`${environment.apiUrl}/lista-compras`,{despensaId:this.despensaId,nome:this.nome.trim(),quantidade:this.quantidade.trim()||null,criadoPor:1}).subscribe({next:i=>{this.itens=[i,...this.itens];this.nome='';this.quantidade='';this.saving=false;this.mensagem('Item adicionado.',false)},error:()=>{this.saving=false;this.mensagem('Não foi possível adicionar o item.',true)}})}
  marcar(item:ItemCompra,comprado:boolean){this.http.patch<ItemCompra>(`${environment.apiUrl}/lista-compras/${item.id}/comprado`,{comprado}).subscribe({next:updated=>this.itens=this.itens.map(i=>i.id===updated.id?updated:i),error:()=>this.mensagem('Falha ao atualizar item.',true)})}
  excluir(item:ItemCompra){this.http.delete(`${environment.apiUrl}/lista-compras/${item.id}`).subscribe({next:()=>this.itens=this.itens.filter(i=>i.id!==item.id),error:()=>this.mensagem('Falha ao excluir item.',true)})}
  private mensagem(t:string,e:boolean){this.feedback=t;this.erro=e}
}
