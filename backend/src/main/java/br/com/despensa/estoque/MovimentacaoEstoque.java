package br.com.despensa.estoque;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name="movimentacoes_estoque")
public class MovimentacaoEstoque {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(name="produto_id", nullable=false)
  private Long produtoId;
  @Enumerated(EnumType.STRING) @Column(nullable=false, length=12)
  private MovimentacaoTipo tipo;
  @Column(nullable=false, precision=12, scale=3)
  private BigDecimal quantidade;
  @Column(length=300)
  private String observacao;
  @Column(name="criado_por")
  private Long criadoPor;
  @Column(name="criado_em", nullable=false, updatable=false)
  private Instant criadoEm = Instant.now();

  protected MovimentacaoEstoque() {}
  public MovimentacaoEstoque(Long produtoId, MovimentacaoTipo tipo, BigDecimal quantidade,
                             String observacao, Long criadoPor) {
    this.produtoId=produtoId; this.tipo=tipo; this.quantidade=quantidade;
    this.observacao=observacao; this.criadoPor=criadoPor;
  }
  public Long getId(){return id;}
  public Long getProdutoId(){return produtoId;}
  public MovimentacaoTipo getTipo(){return tipo;}
  public BigDecimal getQuantidade(){return quantidade;}
  public String getObservacao(){return observacao;}
  public Long getCriadoPor(){return criadoPor;}
  public Instant getCriadoEm(){return criadoEm;}
}
