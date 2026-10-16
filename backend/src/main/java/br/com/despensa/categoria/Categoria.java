package br.com.despensa.categoria;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
@Entity @Table(name="categorias")
public class Categoria {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @NotBlank @Column(nullable=false,length=80) private String nome;
  @Column(name="despensa_id",nullable=false) private Long despensaId;
  protected Categoria(){} public Categoria(String nome,Long despensaId){this.nome=nome;this.despensaId=despensaId;}
  public Long getId(){return id;} public String getNome(){return nome;} public Long getDespensaId(){return despensaId;}
}
