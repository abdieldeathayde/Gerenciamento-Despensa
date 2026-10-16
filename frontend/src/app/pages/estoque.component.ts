import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DespensaService } from '../services/despensa.service';
import { ProdutoService } from '../services/produto.service';
import { Despensa, Produto } from '../models';
import { environment } from '../../environments/environment';
interface Lote {id:number;produtoId:number;quantidade:number;dataValidade?:string|null;localizacao?:string|null}
interface Movimento {id:number;produtoId:number;tipo:'ENTRADA'|'SAIDA'|'AJUSTE';quantidade:number;observacao?:string|null;criadoEm:string}
@Component({standalone:true,selector:'app-estoque',imports:[FormsModule,DatePipe],template:`
<div class="page-heading"><div><div class="eyebrow">CONTROLE DE QUANTIDADES</div><h1>Estoque e validade</h1><p class="muted">Registre entradas e saídas, lotes e datas de validade.</p></div></div>
<section class="panel" style="margin-bottom:18px"><div class="panel-heading"><div><h2>Registrar movimentação</h2><p class="muted">As movimentações formam o histórico do produto.</p></div></div>
<div class="product-form">
<div class="field"><label for="stockPantry">Despensa</label><select id="stockPantry" name="stockPantry" [(ngModel)]="despensaId" (ngModelChange)="carregarProdutos()"><option [ngValue]="null">Selecione</option>@for(d of despensas;track d.id){<option [ngValue]="d.id">{{d.nome}}</option>}</select></div>
<div class="field"><label for="stockProduct">Produto</label><select id="stockProduct" name="stockProduct" [(ngModel)]="produtoId" (ngModelChange)="carregarDados()"><option [ngValue]="null">Selecione</option>@for(p of produtos;track p.id){<option [ngValue]="p.id">{{p.nome}}</option>}</select></div>
<div class="field"><label for="movementType">Tipo</label><select id="movementType" name="movementType" [(ngModel)]="tipo"><option value="ENTRADA">Entrada</option><option value="SAIDA">Saída</option><option value="AJUSTE">Ajuste</option></select></div>
<div class="field"><label for="movementQty">Quantidade</label><input id="movementQty" name="movementQty" type="number" min="0.001" step="0.001" [(ngModel)]="quantidade"></div>
<div class="field"><label for="movementNote">Observação</label><input id="movementNote" name="movementNote" [(ngModel)]="observacao" maxlength="300" placeholder="Ex.: Compra semanal"></div>
<div class="field" style="display:flex;align-items:end"><button class="button primary" (click)="registrar()" [disabled]="!produtoId || quantidade<=0 || saving">{{saving?'Salvando…':'Registrar'}}</button></div>
</div>
@if(feedback){<div class="notice" [class.error]="erro" [class.success]="!erro">{{feedback}}</div>}
</section>
<section class="panel" style="margin-bottom:18px"><div class="panel-heading"><div><h2>Adicionar lote e validade</h2><p class="muted">Registre cada compra como um lote separado.</p></div></div>
<div class="product-form"><div class="field"><label for="lotProduct">Produto</label><select id="lotProduct" name="lotProduct" [(ngModel)]="loteProdutoId"><option [ngValue]="null">Selecione</option>@for(p of produtos;track p.id){<option [ngValue]="p.id">{{p.nome}}</option>}</select></div><div class="field"><label for="lotQty">Quantidade do lote</label><input id="lotQty" name="lotQty" type="number" min="0.001" step="0.001" [(ngModel)]="loteQuantidade"></div><div class="field"><label for="lotDate">Data de validade</label><input id="lotDate" name="lotDate" type="date" [(ngModel)]="validade"></div><div class="field"><label for="lotLocation">Localização</label><input id="lotLocation" name="lotLocation" [(ngModel)]="localizacao" placeholder="Ex.: Armário superior"></div><div class="field" style="display:flex;align-items:end"><button class="button primary" (click)="criarLote()" [disabled]="!loteProdutoId || loteQuantidade<=0">＋ Salvar lote</button></div></div>
</section>
<section class="panel"><div class="panel-heading"><div><h2>Histórico de movimentações</h2><p class="muted">Movimentações do produto selecionado</p></div></div>
@if(!produtoId){<div class="empty-state"><strong>Selecione um produto</strong><p>O histórico será exibido aqui.</p></div>}
@else if(!movimentos.length){<div class="empty-state"><strong>Sem movimentações</strong><p>Registre uma entrada ou saída para começar.</p></div>}
@else{<div class="table-wrap"><table><thead><tr><th>TIPO</th><th>QUANTIDADE</th><th>OBSERVAÇÃO</th><th>DATA</th></tr></thead><tbody>@for(m of movimentos;track m.id){<tr><td><span class="unit-chip">{{m.tipo}}</span></td><td>{{m.quantidade}}</td><td>{{m.observacao||'—'}}</td><td>{{m.criadoEm|date:'dd/MM/yyyy HH:mm'}}</td></tr>}</tbody></table></div>}
<div class="panel-heading" style="margin-top:25px"><div><h2>Lotes e validade</h2><p class="muted">Itens com prazo de validade cadastrado</p></div></div>
@if(lotes.length){<div class="table-wrap"><table><thead><tr><th>PRODUTO</th><th>QUANTIDADE</th><th>VALIDADE</th><th>LOCALIZAÇÃO</th></tr></thead><tbody>@for(l of lotes;track l.id){<tr><td>{{nomeProduto(l.produtoId)}}</td><td>{{l.quantidade}}</td><td>{{l.dataValidade? (l.dataValidade|date:'dd/MM/yyyy'):'Não informada'}}</td><td>{{l.localizacao||'—'}}</td></tr>}</tbody></table></div>}@else{<p class="muted">Nenhum lote para exibir.</p>}
</section>`})
export class EstoqueComponent implements OnInit {
private readonly http=inject(HttpClient);private readonly ds=inject(DespensaService);private readonly ps=inject(ProdutoService);
despensas:Despensa[]=[];produtos:Produto[]=[];despensaId:number|null=null;produtoId:number|null=null;tipo:'ENTRADA'|'SAIDA'|'AJUSTE'='ENTRADA';quantidade=1;observacao='';saving=false;feedback='';erro=false;movimentos:Movimento[]=[];lotes:Lote[]=[];loteProdutoId:number|null=null;loteQuantidade=1;validade='';localizacao='';
ngOnInit(){this.ds.listar().subscribe({next:d=>{this.despensas=d;if(d.length){this.despensaId=d[0].id;this.carregarProdutos()}},error:()=>this.mensagem('Falha ao carregar despensas.',true)})}
carregarProdutos(){this.produtos=[];this.produtoId=null;this.movimentos=[];this.lotes=[];if(!this.despensaId)return;this.ps.listar(this.despensaId).subscribe({next:p=>{this.produtos=p;if(p.length){this.produtoId=p[0].id;this.loteProdutoId=p[0].id;this.carregarDados()}},error:()=>this.mensagem('Falha ao carregar produtos.',true)})}
carregarDados(){if(!this.produtoId)return;const params=new HttpParams().set('produtoId',this.produtoId);this.http.get<Movimento[]>(`${environment.apiUrl}/movimentacoes`,{params}).subscribe({next:m=>this.movimentos=m,error:()=>this.movimentos=[]});this.http.get<Lote[]>(`${environment.apiUrl}/lotes`,{params}).subscribe({next:l=>this.lotes=l,error:()=>this.lotes=[]})}
registrar(){if(!this.produtoId||this.quantidade<=0)return;this.saving=true;this.http.post<Movimento>(`${environment.apiUrl}/movimentacoes`,{produtoId:this.produtoId,tipo:this.tipo,quantidade:this.quantidade,observacao:this.observacao||null,criadoPor:1}).subscribe({next:()=>{this.saving=false;this.observacao='';this.mensagem('Movimentação registrada.',false);this.carregarDados()},error:()=>{this.saving=false;this.mensagem('Não foi possível registrar. Confira se a API foi atualizada.',true)}})}
criarLote(){if(!this.loteProdutoId||this.loteQuantidade<=0)return;this.http.post<Lote>(`${environment.apiUrl}/lotes`,{produtoId:this.loteProdutoId,quantidade:this.loteQuantidade,dataValidade:this.validade||null,localizacao:this.localizacao||null}).subscribe({next:l=>{if(l.produtoId===this.produtoId)this.lotes=[...this.lotes,l].sort((a,b)=>(a.dataValidade||'9999').localeCompare(b.dataValidade||'9999'));this.mensagem('Lote cadastrado.',false);this.validade='';this.localizacao=''},error:()=>this.mensagem('Não foi possível cadastrar o lote.',true)})}
nomeProduto(id:number){return this.produtos.find(p=>p.id===id)?.nome||`Produto #${id}`}
private mensagem(t:string,e:boolean){this.feedback=t;this.erro=e}
}
