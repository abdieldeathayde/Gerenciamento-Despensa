import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DespensaService } from '../services/despensa.service';
import { Despensa } from '../models';

@Component({
  standalone: true,
  selector: 'app-despensas',
  imports: [FormsModule],
  template: `
    <div class="page-heading"><div><div class="eyebrow">SEUS ESPAÇOS</div><h1>Minhas despensas</h1><p class="muted">Crie e organize espaços para manter seus itens separados.</p></div></div>
    <div class="content-grid">
      <section class="panel form-panel"><div class="panel-heading"><div><h2>Nova despensa</h2><p class="muted">Dê um nome ao espaço que deseja organizar.</p></div><span class="form-icon">＋</span></div>
        <form (ngSubmit)="criar()">
          <label for="nome">Nome da despensa <span>*</span></label><input id="nome" name="nome" [(ngModel)]="nome" required maxlength="100" placeholder="Ex.: Cozinha de casa">
          <label for="descricao">Descrição</label><textarea id="descricao" name="descricao" [(ngModel)]="descricao" rows="3" maxlength="500" placeholder="Ex.: Alimentos secos, enlatados e grãos"></textarea>
          <label for="proprietario">ID do proprietário (protótipo)</label><input id="proprietario" name="proprietario" type="number" [(ngModel)]="proprietarioId" min="1" required>
          <p class="field-hint">No sistema final, este ID será obtido automaticamente após o login.</p>
          @if (feedback) { <div class="notice" [class.error]="isError" [class.success]="!isError">{{ feedback }}</div> }
          <button class="button primary full" type="submit" [disabled]="saving || !nome.trim()">{{ saving ? 'Salvando…' : '＋ Criar despensa' }}</button>
        </form>
      </section>
      <section class="panel"><div class="panel-heading"><div><h2>Espaços cadastrados</h2><p class="muted">{{ despensas.length }} despensa(s)</p></div><span class="count-pill">{{ despensas.length }}</span></div>
        @if (loading) { <div class="empty-state">Carregando…</div> }
        @else if (despensas.length === 0) { <div class="empty-state"><div class="empty-illustration">⌂</div><strong>Nenhuma despensa ainda</strong><p>Use o formulário para criar seu primeiro espaço.</p></div> }
        @else { <div class="pantry-list">@for (item of despensas; track item.id) { <article class="pantry-card"><div class="pantry-card-icon">⌂</div><div class="pantry-card-main"><strong>{{ item.nome }}</strong><p>{{ item.descricao || 'Sem descrição' }}</p><small>Identificador: {{ item.id }}</small></div><span class="status-tag">Criada</span></article> }</div> }
      </section>
    </div>
  `
})
export class DespensasComponent implements OnInit {
  private readonly service = inject(DespensaService);
  despensas: Despensa[] = [];
  nome = '';
  descricao = '';
  proprietarioId = 1;
  loading = true;
  saving = false;
  feedback = '';
  isError = false;

  ngOnInit(): void { this.carregar(); }
  carregar(): void {
    this.loading = true;
    this.service.listar().subscribe({
      next: items => { this.despensas = items; this.loading = false; },
      error: () => { this.loading = false; this.feedback = 'Não foi possível carregar. Verifique o backend.'; this.isError = true; }
    });
  }
  criar(): void {
    if (!this.nome.trim() || !this.proprietarioId || this.proprietarioId < 1) return;
    this.saving = true; this.feedback = '';
    this.service.criar({ nome: this.nome.trim(), descricao: this.descricao.trim(), proprietarioId: Number(this.proprietarioId) }).subscribe({
      next: created => {
        this.despensas = [...this.despensas, created];
        this.nome = ''; this.descricao = ''; this.saving = false;
        this.feedback = 'Despensa criada com sucesso.'; this.isError = false;
      },
      error: () => { this.saving = false; this.feedback = 'Falha ao criar despensa. Confira os dados e a API.'; this.isError = true; }
    });
  }
}
