package br.com.despensa.despensa;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
@Entity @Table(name="despensas")
public class Despensa {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @NotBlank @Column(nullable=false,length=100) private String nome;
  @Column(length=500) private String descricao;
  @Column(name="proprietario_id",nullable=false) private Long proprietarioId;
  @Column(name="criado_em",nullable=false,updatable=false) private Instant criadoEm=Instant.now();
  protected Despensa() {}
  public Despensa(String nome,String descricao,Long proprietarioId){this.nome=nome;this.descricao=descricao;this.proprietarioId=proprietarioId;}
  public Long getId(){return id;} public String getNome(){return nome;} public String getDescricao(){return descricao;}
  public Long getProprietarioId(){return proprietarioId;} public Instant getCriadoEm(){return criadoEm;}
}
