package br.com.despensa.compra;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

@Entity
@Table(name="itens_lista_compra")
public class ItemListaCompra {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(name="despensa_id", nullable=false)
  private Long despensaId;
  @NotBlank @Column(nullable=false, length=140)
  private String nome;
  @Column(length=30)
  private String quantidade;
  @Column(nullable=false)
  private boolean comprado=false;
  @Column(name="criado_por")
  private Long criadoPor;
  @Column(name="criado_em", nullable=false, updatable=false)
  private Instant criadoEm=Instant.now();

  protected ItemListaCompra() {}
  public ItemListaCompra(Long despensaId, String nome, String quantidade, Long criadoPor) {
    this.despensaId=despensaId; this.nome=nome; this.quantidade=quantidade; this.criadoPor=criadoPor;
  }
  public Long getId(){return id;} public Long getDespensaId(){return despensaId;}
  public String getNome(){return nome;} public String getQuantidade(){return quantidade;}
  public boolean isComprado(){return comprado;} public Long getCriadoPor(){return criadoPor;}
  public Instant getCriadoEm(){return criadoEm;}
  public void marcarComprado(boolean comprado){this.comprado=comprado;}
}
