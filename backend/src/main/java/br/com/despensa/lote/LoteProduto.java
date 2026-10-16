package br.com.despensa.lote;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name="lotes_produto")
public class LoteProduto {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(name="produto_id", nullable=false)
  private Long produtoId;
  @Column(nullable=false, precision=12, scale=3)
  private BigDecimal quantidade;
  @Column(name="data_validade")
  private LocalDate dataValidade;
  @Column(length=120)
  private String localizacao;
  @Column(name="criado_em", nullable=false, updatable=false)
  private Instant criadoEm=Instant.now();

  protected LoteProduto() {}
  public LoteProduto(Long produtoId, BigDecimal quantidade, LocalDate dataValidade, String localizacao) {
    this.produtoId=produtoId; this.quantidade=quantidade; this.dataValidade=dataValidade; this.localizacao=localizacao;
  }
  public Long getId(){return id;} public Long getProdutoId(){return produtoId;}
  public BigDecimal getQuantidade(){return quantidade;} public LocalDate getDataValidade(){return dataValidade;}
  public String getLocalizacao(){return localizacao;} public Instant getCriadoEm(){return criadoEm;}
}
