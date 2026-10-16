package br.com.despensa.produto;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;
@Entity @Table(name="produtos")
public class Produto {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @NotBlank @Column(nullable=false,length=140) private String nome;
  @Column(length=500) private String descricao;
  @Column(name="despensa_id",nullable=false) private Long despensaId;
  @Column(name="categoria_id") private Long categoriaId;
  @NotBlank @Column(nullable=false,length=20) private String unidade="UN";
  @DecimalMin("0.0") @Column(name="estoque_minimo",nullable=false,precision=12,scale=3) private BigDecimal estoqueMinimo=BigDecimal.ZERO;
  @Column(name="criado_em",nullable=false,updatable=false) private Instant criadoEm=Instant.now();
  protected Produto(){}
  public Produto(String nome,String descricao,Long despensaId,Long categoriaId,String unidade,BigDecimal estoqueMinimo){
    this.nome=nome;this.descricao=descricao;this.despensaId=despensaId;this.categoriaId=categoriaId;
    this.unidade=unidade==null?"UN":unidade;this.estoqueMinimo=estoqueMinimo==null?BigDecimal.ZERO:estoqueMinimo;
  }
  public Long getId(){return id;} public String getNome(){return nome;} public String getDescricao(){return descricao;}
  public Long getDespensaId(){return despensaId;} public Long getCategoriaId(){return categoriaId;}
  public String getUnidade(){return unidade;} public BigDecimal getEstoqueMinimo(){return estoqueMinimo;}
}
