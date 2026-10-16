import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <section class="auth-story">
        <a class="auth-brand" routerLink="/" aria-label="Minha Despensa, página inicial">
          <span class="brand-mark">✳</span>
          <span><strong>Despensa</strong><small>GESTÃO COMPARTILHADA</small></span>
        </a>
        <div class="auth-story-copy">
          <span class="banner-pill">✦ UM BOM COMEÇO</span>
          <h1>Cuide da sua casa<br>com <em>mais leveza.</em></h1>
          <p>Crie seu espaço, organize o que você já tem e descubra uma forma mais simples de evitar desperdícios.</p>
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
            <div class="eyebrow">COMECE POR AQUI</div>
            <h2>Crie sua conta</h2>
            <p class="muted">Leva só um minutinho para organizar sua rotina.</p>
          </div>

          <form [formGroup]="form" (ngSubmit)="cadastrar()" novalidate>
            <div class="auth-field">
              <label for="cadastro-nome">Nome completo</label>
              <input id="cadastro-nome" type="text" formControlName="nome" autocomplete="name" placeholder="Como podemos chamar você?">
              @if (form.controls.nome.touched && form.controls.nome.hasError('required')) {
                <small class="auth-field-error">Informe seu nome.</small>
              } @else if (form.controls.nome.touched && form.controls.nome.hasError('minlength')) {
                <small class="auth-field-error">Seu nome precisa ter pelo menos 2 caracteres.</small>
              }
            </div>

            <div class="auth-field">
              <label for="cadastro-email">E-mail</label>
              <input id="cadastro-email" type="email" formControlName="email" autocomplete="email" placeholder="voce@exemplo.com">
              @if (form.controls.email.touched && form.controls.email.hasError('required')) {
                <small class="auth-field-error">Informe seu e-mail.</small>
              } @else if (form.controls.email.touched && form.controls.email.hasError('email')) {
                <small class="auth-field-error">Digite um e-mail válido.</small>
              }
            </div>

            <div class="auth-field">
              <label for="cadastro-senha">Senha</label>
              <div class="auth-password">
                <input id="cadastro-senha" [type]="showPassword ? 'text' : 'password'" formControlName="senha" autocomplete="new-password" placeholder="Pelo menos 8 caracteres">
                <button type="button" class="password-toggle" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Ocultar senha' : 'Mostrar senha'">
                  {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                </button>
              </div>
              @if (form.controls.senha.touched && form.controls.senha.hasError('required')) {
                <small class="auth-field-error">Crie uma senha.</small>
              } @else if (form.controls.senha.touched && form.controls.senha.hasError('minlength')) {
                <small class="auth-field-error">Use pelo menos 8 caracteres.</small>
              }
              <small class="auth-hint">Use pelo menos 8 caracteres para proteger sua conta.</small>
            </div>

            <div class="auth-field">
              <label for="cadastro-confirmar">Confirme sua senha</label>
              <input id="cadastro-confirmar" type="password" formControlName="confirmarSenha" autocomplete="new-password" placeholder="Digite a senha novamente">
              @if (form.controls.confirmarSenha.touched && form.controls.confirmarSenha.hasError('required')) {
                <small class="auth-field-error">Confirme sua senha.</small>
              } @else if (form.controls.confirmarSenha.touched && form.hasError('senhasDiferentes')) {
                <small class="auth-field-error">As senhas não conferem.</small>
              }
            </div>

            @if (feedback) { <div class="notice error" role="alert">{{ feedback }}</div> }

            <button class="button primary full auth-submit" type="submit">Criar minha conta <span>→</span></button>
          </form>

          <p class="auth-switch">Já tem uma conta? <a routerLink="/login">Entrar</a></p>
          <div class="auth-security"><span>♧</span> Seus dados são tratados com cuidado e segurança.</div>
        </div>
        <footer class="auth-footer">© 2026 Minha Despensa <span>•</span> Feito para uma rotina mais leve</footer>
      </section>
    </main>
  `
})
export class CadastroComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly validarSenhas = (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  };
  readonly form = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmarSenha: ['', Validators.required]
  }, { validators: this.validarSenhas });
  showPassword = false;
  feedback = '';

  cadastrar(): void {
    this.feedback = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.feedback = 'O cadastro ainda não está conectado: o backend não disponibiliza o endpoint de criação de conta.';
  }
}
