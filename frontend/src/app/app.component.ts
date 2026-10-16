import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    @if (isAuthPage()) {
      <router-outlet />
    } @else {
    <div class="app-shell">
      <aside class="sidebar">
        <a class="brand" routerLink="/">
          <span class="brand-mark">✳</span>
          <span><strong>Despensa</strong><small>GESTÃO COMPARTILHADA</small></span>
        </a>
        <div class="nav-label">MENU PRINCIPAL</div>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><span>▦</span> Visão geral</a>
          <a routerLink="/despensas" routerLinkActive="active"><span>⌂</span> Minhas despensas</a>
          <a routerLink="/produtos" routerLinkActive="active"><span>▤</span> Produtos</a>
          <a routerLink="/estoque" routerLinkActive="active"><span>↕</span> Estoque e validade</a>
          <a routerLink="/lista-compras" routerLinkActive="active"><span>☷</span> Lista de compras</a>
        </nav>
        <div class="sidebar-bottom">
          <div class="help-card"><span class="help-icon">?</span><strong>Organize melhor</strong><p>Compartilhe a despensa e mantenha todos atualizados.</p></div>
          <div class="profile"><div class="avatar">U</div><div><strong>Usuário local</strong><small>Protótipo</small></div><span class="profile-dots">•••</span></div>
        </div>
      </aside>
      <main class="main-area">
        <header class="topbar">
          <div class="breadcrumb">Workspace <span>/</span> <strong>Minha despensa</strong></div>
          <div class="top-actions"><span class="status-dot"></span><span>Ambiente de desenvolvimento</span><button class="icon-button" aria-label="Notificações">♧</button></div>
        </header>
        <section class="page-content"><router-outlet /></section>
        <footer>Minha Despensa <span>•</span> Projeto demonstrativo</footer>
      </main>
    </div>
    }
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  readonly isAuthPage = signal(this.isAuthenticationRoute(this.router.url));

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.isAuthPage.set(this.isAuthenticationRoute(event.urlAfterRedirects)));
  }

  private isAuthenticationRoute(url: string): boolean {
    return url.split('?')[0].split('#')[0] === '/login' || url.split('?')[0].split('#')[0] === '/cadastro';
  }
}
