import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <section class="auth-story">
        <a class="auth-brand" routerLink="/" aria-label="Minha Despensa, página inicial">
          <span class="brand-mark">✳</span>
          <span><strong>Despensa</strong><small>GESTÃO COMPARTILHADA</small></span>
        </a>
        <div class="auth-story-copy">
          <span class="banner-pill">✦ SUA ROTINA MAIS LEVE</span>
          <h1>Organização que<br>faz bem <em>todo dia.</em></h1>
          <p>Tenha seus produtos, validades e listas sempre à mão. Um espaço simples para cuidar melhor da sua casa.</p>
          <div class="auth-illustration" aria-hidden="true">
            <div class="auth-sun"></div>
            <div class="auth-shelf auth-shelf-one"><i class="jar green"></i><i class="jar cream"></i><i class="jar orange"></i><i class="can"></i></div>
            <div class="auth-shelf auth-shelf-two"><i class="bottle"></i><i class="jar cream"></i><i class="jar green"></i><i class="box-art"></i></div>
            <span class="auth-leaf">♧</span>
          </div>
        </div>
        <div class="auth-story-footer">MENOS DESPERDÍCIO, MAIS TRANQUILIDADE <span>✳</span></div>
      </section>

      <section class="auth-form-side">
        <div class="auth-form-wrap">
          <div class="auth-mobile-brand"><span class="brand-mark">✳</span><strong>Despensa</strong></div>
          <div class="auth-heading">
            <div class="eyebrow">BEM-VINDO DE VOLTA</div>
            <h2>Entre na sua conta</h2>
            <p class="muted">Acesse sua despensa e continue de onde parou.</p>
          </div>

          <form [formGroup]="form" (ngSubmit)="entrar()" novalidate>
            <div class="auth-field">
              <label for="login-email">E-mail</label>
              <input id="login-email" type="email" formControlName="email" autocomplete="email" placeholder="voce@exemplo.com">
              @if (form.controls.email.touched && form.controls.email.hasError('required')) {
                <small class="auth-field-error">Informe seu e-mail.</small>
              } @else if (form.controls.email.touched && form.controls.email.hasError('email')) {
                <small class="auth-field-error">Digite um e-mail válido.</small>
              }
            </div>

            <div class="auth-field">
              <div class="auth-label-row"><label for="login-password">Senha</label></div>
              <div class="auth-password">
                <input id="login-password" [type]="showPassword ? 'text' : 'password'" formControlName="senha" autocomplete="current-password" placeholder="Sua senha">
                <button type="button" class="password-toggle" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Ocultar senha' : 'Mostrar senha'">
                  {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                </button>
              </div>
              @if (form.controls.senha.touched && form.controls.senha.hasError('required')) {
                <small class="auth-field-error">Informe sua senha.</small>
              }
            </div>

            @if (feedback) { <div class="notice error" role="alert">{{ feedback }}</div> }

            <button class="button primary full auth-submit" type="submit">Entrar <span>→</span></button>
          </form>

          <p class="auth-switch">Ainda não tem uma conta? <a routerLink="/cadastro">Cadastre-se</a></p>
          <div class="auth-security"><span>♧</span> Seus dados são tratados com cuidado e segurança.</div>
        </div>
        <footer class="auth-footer">© 2026 Minha Despensa <span>•</span> Feito para uma rotina mais leve</footer>
      </section>
    </main>
  `
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required]
  });
  showPassword = false;
  feedback = '';

  entrar(): void {
    this.feedback = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.feedback = 'O login ainda não está conectado: o backend não disponibiliza o endpoint de autenticação.';
  }
}
