package br.com.despensa.usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.Instant;
@Entity @Table(name="usuarios",uniqueConstraints=@UniqueConstraint(name="uk_usuario_email",columnNames="email"))
public class Usuario {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @NotBlank @Column(nullable=false,length=120) private String nome;
  @Email @NotBlank @Column(nullable=false,length=180) private String email;
  @Column(name="senha_hash",length=255) private String senhaHash;
  @Column(nullable=false) private boolean ativo=true;
  @Column(name="criado_em",nullable=false,updatable=false) private Instant criadoEm=Instant.now();
  protected Usuario(){} public Usuario(String nome,String email){this.nome=nome;this.email=email;}
  public Long getId(){return id;} public String getNome(){return nome;} public String getEmail(){return email;} public boolean isAtivo(){return ativo;}
}
