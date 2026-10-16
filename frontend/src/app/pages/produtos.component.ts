import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DespensaService } from '../services/despensa.service';
import { ProdutoService } from '../services/produto.service';
import { Despensa, Produto } from '../models';

@Component({
  standalone: true,
  selector: 'app-produtos',
  imports: [FormsModule],
  template: `
    <div class="page-heading"><div><div class="eyebrow">CATÁLOGO DA CASA</div><h1>Produtos</h1><p class="muted">Cadastre e encontre os itens guardados nas suas despensas.</p></div></div>
    <section class="panel product-form-panel"><div class="panel-heading"><div><h2>Novo produto</h2><p class="muted">Preencha as informações básicas do item.</p></div><span class="form-icon">＋</span></div>
      <form class="product-form" (ngSubmit)="criar()">
        <div class="field"><label for="produtoNome">Nome do produto <span>*</span></label><input id="produtoNome" name="produtoNome" [(ngModel)]="nome" required maxlength="140" placeholder="Ex.: Arroz integral"></div>
        <div class="field"><label for="despensa">Despensa <span>*</span></label><select id="despensa" name="despensa" [(ngModel)]="despensaId" required><option [ngValue]="null">Selecione uma despensa</option>@for (d of despensas; track d.id) { <option [ngValue]="d.id">{{ d.nome }}</option> }</select></div>
        <div class="field"><label for="unidade">Unidade</label><select id="unidade" name="unidade" [(ngModel)]="unidade"><option value="UN">Unidade (UN)</option><option value="KG">Quilograma (KG)</option><option value="G">Grama (G)</option><option value="L">Litro (L)</option><option value="ML">Mililitro (ML)</option><option value="PACOTE">Pacote</option></select></div>
        <div class="field"><label for="minimo">Estoque mínimo</label><input id="minimo" name="minimo" type="number" min="0" step="0.001" [(ngModel)]="estoqueMinimo"></div>
        <div class="field wide"><label for="produtoDescricao">Descrição</label><input id="produtoDescricao" name="produtoDescricao" [(ngModel)]="descricao" maxlength="500" placeholder="Marca, tamanho ou observações"></div>
        <div class="field wide form-actions">@if (feedback) { <div class="notice" [class.error]="isError" [class.success]="!isError">{{ feedback }}</div> }<button class="button primary" type="submit" [disabled]="saving || !nome.trim() || !despensaId">{{ saving ? 'Salvando…' : '＋ Adicionar produto' }}</button></div>
      </form>
    </section>
    <section class="panel product-list-panel"><div class="panel-heading"><div><h2>Produtos cadastrados</h2><p class="muted">Itens registrados na despensa selecionada</p></div><div class="search-box"><span>⌕</span><input aria-label="Pesquisar produto" [(ngModel)]="busca" placeholder="Buscar produto…"></div></div>
      @if (loading) { <div class="empty-state">Carregando produtos…</div> }
      @else if (!despensaId) { <div class="empty-state"><div class="empty-illustration">▤</div><strong>Selecione uma despensa</strong><p>Escolha uma despensa no formulário para visualizar os produtos.</p></div> }
      @else if (filtrados.length === 0) { <div class="empty-state"><div class="empty-illustration">▤</div><strong>Nenhum produto encontrado</strong><p>Cadastre um produto ou altere sua pesquisa.</p></div> }
      @else { <div class="table-wrap"><table><thead><tr><th>PRODUTO</th><th>UNIDADE</th><th>ESTOQUE MÍNIMO</th><th>DESCRIÇÃO</th></tr></thead><tbody>@for (p of filtrados; track p.id) { <tr><td><div class="table-product"><span class="product-thumb">▤</span><strong>{{ p.nome }}</strong></div></td><td><span class="unit-chip">{{ p.unidade }}</span></td><td>{{ p.estoqueMinimo }}</td><td>{{ p.descricao || '—' }}</td></tr> }</tbody></table></div> }
    </section>
  `
})
export class ProdutosComponent implements OnInit {
  private readonly despensaService = inject(DespensaService);
  private readonly produtoService = inject(ProdutoService);
  despensas: Despensa[] = [];
  produtos: Produto[] = [];
  despensaId: number | null = null;
  nome = ''; descricao = ''; unidade = 'UN'; estoqueMinimo = 0;
  busca = ''; loading = false; saving = false; feedback = ''; isError = false;

  get filtrados(): Produto[] {
    const term = this.busca.trim().toLocaleLowerCase('pt-BR');
    return this.produtos.filter(p => p.nome.toLocaleLowerCase('pt-BR').includes(term));
  }
  ngOnInit(): void {
    this.despensaService.listar().subscribe({
      next: items => { this.despensas = items; if (items.length) { this.despensaId = items[0].id; this.carregarProdutos(); } },
      error: () => { this.feedback = 'Não foi possível carregar despensas. Verifique a API.'; this.isError = true; }
    });
  }
  carregarProdutos(): void {
    if (!this.despensaId) { this.produtos = []; return; }
    this.loading = true;
    this.produtoService.listar(this.despensaId).subscribe({
      next: items => { this.produtos = items; this.loading = false; },
      error: () => { this.loading = false; this.feedback = 'Falha ao carregar produtos. Verifique a API.'; this.isError = true; }
    });
  }
  criar(): void {
    if (!this.nome.trim() || !this.despensaId) return;
    this.saving = true; this.feedback = '';
    this.produtoService.criar({
      nome: this.nome.trim(), descricao: this.descricao.trim(), despensaId: this.despensaId,
      categoriaId: null, unidade: this.unidade, estoqueMinimo: Number(this.estoqueMinimo) || 0
    }).subscribe({
      next: product => {
        this.produtos = [...this.produtos, product].sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        this.nome = ''; this.descricao = ''; this.estoqueMinimo = 0; this.saving = false;
        this.feedback = 'Produto cadastrado com sucesso.'; this.isError = false;
      },
      error: () => { this.saving = false; this.feedback = 'Falha ao cadastrar produto. Verifique os dados e a API.'; this.isError = true; }
    });
  }
}
