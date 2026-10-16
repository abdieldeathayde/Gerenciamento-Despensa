package br.com.despensa.despensa;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="membros_despensa",uniqueConstraints=@UniqueConstraint(name="uk_membro_despensa_usuario",columnNames={"despensa_id","usuario_id"}))
public class MembroDespensa {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Column(name="despensa_id",nullable=false) private Long despensaId;
  @Column(name="usuario_id",nullable=false) private Long usuarioId;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private PapelDespensa papel;
  @Column(name="adicionado_em",nullable=false,updatable=false) private Instant adicionadoEm=Instant.now();
  protected MembroDespensa(){}
  public MembroDespensa(Long despensaId,Long usuarioId,PapelDespensa papel){this.despensaId=despensaId;this.usuarioId=usuarioId;this.papel=papel;}
  public Long getId(){return id;} public Long getDespensaId(){return despensaId;} public Long getUsuarioId(){return usuarioId;} public PapelDespensa getPapel(){return papel;}
}
