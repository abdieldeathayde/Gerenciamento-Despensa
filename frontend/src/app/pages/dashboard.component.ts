import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DespensaService } from '../services/despensa.service';
import { Despensa } from '../models';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink],
  template: `
    <div class="page-heading">
      <div><div class="eyebrow">SEU ESPAÇO ORGANIZADO</div><h1>Visão geral</h1><p class="muted">Acompanhe suas despensas e mantenha tudo sob controle.</p></div>
      <a class="button primary" routerLink="/despensas"><span>＋</span> Nova despensa</a>
    </div>

    <div class="welcome-banner">
      <div class="welcome-copy"><span class="banner-pill">✦ ORGANIZAÇÃO SIMPLES</span><h2>Tudo em seu lugar.<br><em>Menos desperdício.</em></h2><p>Organize seus produtos, acompanhe seu estoque e compartilhe a rotina com quem mora com você.</p><a routerLink="/produtos" class="banner-link">Explorar produtos <span>→</span></a></div>
      <div class="pantry-art" aria-hidden="true"><div class="sun"></div><div class="shelf shelf-one"><i class="jar green"></i><i class="jar cream"></i><i class="jar orange"></i><i class="can"></i></div><div class="shelf shelf-two"><i class="bottle"></i><i class="jar cream"></i><i class="jar green"></i><i class="box-art"></i></div><div class="plant">♧</div></div>
    </div>

    <div class="section-heading"><div><h2>Resumo da despensa</h2><p class="muted">Uma visão rápida do seu espaço</p></div><span class="date-label">{{ today | date:'dd MMM, yyyy' }}</span></div>
    <div class="stats-grid">
      <article class="stat-card"><div class="stat-icon green-bg">⌂</div><span class="stat-label">Despensas cadastradas</span><strong>{{ despensas.length }}</strong><small><span class="tiny-dot green-dot"></span> Espaços disponíveis</small></article>
      <article class="stat-card"><div class="stat-icon blue-bg">▤</div><span class="stat-label">Produtos cadastrados</span><strong>—</strong><small>Disponível após carregar estoque</small></article>
      <article class="stat-card"><div class="stat-icon amber-bg">◷</div><span class="stat-label">Próximos do vencimento</span><strong>—</strong><small>Ative o módulo de lotes</small></article>
      <article class="stat-card"><div class="stat-icon violet-bg">♧</div><span class="stat-label">Membros compartilhados</span><strong>—</strong><small>Convites serão adicionados</small></article>
    </div>

    <div class="lower-grid">
      <section class="panel"><div class="panel-heading"><div><h2>Suas despensas</h2><p class="muted">Espaços que você organiza</p></div><a routerLink="/despensas" class="text-link">Ver todas →</a></div>
        @if (loading) { <div class="empty-state">Carregando despensas…</div> }
        @else if (error) { <div class="notice error">{{ error }}</div> }
        @else if (despensas.length === 0) { <div class="empty-state"><div class="empty-illustration">⌂</div><strong>Sua organização começa aqui</strong><p>Crie sua primeira despensa para começar a cadastrar produtos.</p><a class="button primary" routerLink="/despensas">＋ Criar despensa</a></div> }
        @else { <div class="pantry-list">@for (item of despensas.slice(0, 4); track item.id) { <div class="pantry-row"><div class="mini-house">⌂</div><div class="row-main"><strong>{{ item.nome }}</strong><small>{{ item.descricao || 'Sem descrição' }}</small></div><span class="member-chip">Despensa #{{ item.id }}</span></div> }</div> }
      </section>
      <section class="panel tips-panel"><div class="panel-heading"><div><h2>Próximos passos</h2><p class="muted">Deixe sua despensa pronta</p></div><span class="sparkle">✦</span></div>
        <div class="tip-row"><span class="tip-number">01</span><div><strong>Cadastre seus produtos</strong><p>Adicione os itens que você já tem em casa.</p><a routerLink="/produtos">Ir para produtos →</a></div></div>
        <div class="tip-row"><span class="tip-number">02</span><div><strong>Organize por despensa</strong><p>Separe cozinha, geladeira ou área de serviço.</p><a routerLink="/despensas">Gerenciar despensas →</a></div></div>
        <div class="tip-row"><span class="tip-number">03</span><div><strong>Compartilhe com a família</strong><p>O módulo de convites pode ser integrado na próxima etapa.</p></div></div>
      </section>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private readonly despensaService = inject(DespensaService);
  despensas: Despensa[] = [];
  loading = true;
  error = '';
  readonly today = new Date();

  ngOnInit(): void {
    this.despensaService.listar().subscribe({
      next: items => { this.despensas = items; this.loading = false; },
      error: () => { this.error = 'Não foi possível conectar à API. Confira se o backend está rodando em localhost:8080.'; this.loading = false; }
    });
  }
}
